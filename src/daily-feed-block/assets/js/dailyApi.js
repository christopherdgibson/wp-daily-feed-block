export async function populateDailyApiData(containerRef, date, updateDate = true, eventKey = "Events") {
	const apiDataDiv = containerRef.querySelector(".api-data");
    if (!apiDataDiv) return;
	const result = await fetchDailyApiData(date, eventKey);
	if (result.success) {
		apiDataDiv.innerHTML = `
			<div class="api-data-body">${result.body}</div>
			<div class="api-data-copyright">${result.reference}</div>
		`;
    } else {
		apiDataDiv.innerHTML = result.error;
		// setApiError(result.error);
		if (result.skipDate) {
			return; // Do not set date 
		}
    }
	if (updateDate) {
		setApiDataDate(containerRef, date);
	}
}

async function fetchDailyApiData(date, eventKey = "Events") {
	// if (no proxy) // for additional parameter to select proxy, otw try catch try proxy
	// const apiUrl = getApiUrl(date);
	// console.log("apiUrl:", apiUrl);

	const proxyPath = getProxyUrl(date);

	const mapResponse = (data, key) => ({
		body: data?.[key]?.[0]?.text,
		reference: data?.[key]?.[0]?.html
	});

    return fetchWithRetry(proxyPath)
		.then((jsondta) => {
			const { body, reference } = mapResponse(jsondta?.data, eventKey);
			if (body) {
				console.log("jsondta.data:", jsondta.data);
				return { success: true, body: body, reference: reference };
			} else {
				if (jsondta == "Too many requests.") {
					return { success: false, skipDate: false, error: "Too many requests. Please wait at least 30 seconds." };
				} else {
					return { success: false, skipDate: false, error: "No data found. Try reloading page." };
				}
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			return { success: false, skipDate: true, error: "An unexpected error occurred." };
		});
}

export async function refreshRawJsonData(rawJsonRef, date) {
    if (!rawJsonRef) return;

	rawJsonRef.innerHTML = "Loading raw data...";
	const proxyPath = getProxyUrl(date);
	fetchWithRetry(proxyPath)
		.then((jsondta) => {
			rawJsonRef.innerHTML = renderValueCollapsible(jsondta);
		})
}

function renderValueRecursive(val) {
  if (val === null) return `<span class="null">null</span>`;
  if (typeof val !== 'object') return `<span>${val}</span>`;

  if (Array.isArray(val)) {
    return `<ul>${val.map(item => `<li>${renderValueRecursive(item)}</li>`).join('')}</ul>`;
  }

  // Plain object
  return `<dl>
    ${Object.entries(val).map(([k, v]) =>
      `<dt><b>${k}</b></dt><dd>${renderValueRecursive(v)}</dd>`
    ).join('')}
  </dl>`;
}

function renderValueCollapsible(val, key = '') {
  if (val === null || typeof val !== 'object') {
    return `${key ? `<b>${key}:</b> ` : ''}${val}`;
  }

  const entries = Array.isArray(val)
    ? val.map((v, i) => renderValueCollapsible(v, i))
    : Object.entries(val).map(([k, v]) => renderValueCollapsible(v, k));

  const label = key
    ? `${key} (${Array.isArray(val) ? `${val.length} items` : 'object'})`
    : 'root';

  return `<details open>
    <summary>${label}</summary>
    <div style="padding-left:1em">${entries.join('<br>')}</div>
  </details>`;
}

function setApiDataDate(containerRef, date) {
	const monthName = date.toLocaleString("default", { month: "long" });
	const apiDataDate = containerRef.querySelector(".api-data-date");
	apiDataDate.innerHTML = `Daily api data for ${monthName} ${date.getDate()}.`;
	console.log("api data date element:", apiDataDate);
}

function getApiUrl(date, padded = true) {
	let day = date.getDate();
	if (padded == true && day < 10) {
		day = "0" + day;
	}
	let month = date.getMonth() + 1;
	return `https://today.zenquotes.io/api/${month}/${day}`;
}

function getProxyUrl(date, padded = true) {
	const apiUrl = getApiUrl(date, padded);
	return `${dailyFeedBlock.ajaxUrl}?action=api_proxy&url=${apiUrl}`;
}

function fetchJsonAsync(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((jsondta) => resolve(jsondta))
			.catch((error) => {
				console.error(err);
				reject(error);
			});
	});
}

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
			const data = await response.json();

			if ("success" in data && !data.success) {
				if (
					data.data &&
					data.data.error &&
					data.data.error.includes("cURL error 28")
				) {
					throw new Error("timeout");
				}
				throw new Error(data.message || "API returned success: false");
			}

			if (!data.data || !data.data.Events) {
				if (data[0]?.q && data[0]?.q?.includes("Too many requests. Obtain an auth key for unlimited access")) {
					console.log("Too many requests: ", data);
					return "Too many requests.";
				} else {
					console.log("data missing expected structure error:", data);
					throw new Error("API data missing expected structure.");
				}
			}
			return data;
		} catch (err) {
			if (
				attempt < retries &&
				(err.message === "timeout" || err.name === "TypeError")
			) {
				console.log("Trying to fetch again, attempt:", attempt);
				await new Promise((res) => setTimeout(res, delay));
				// retry!
			} else {
				throw err;
			}
		}
	}
}
