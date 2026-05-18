export async function populateDailyFeedData(
	containerRef: HTMLElement,
	date: Date,
	updateDate: boolean = true,
	eventKey: string = "Events")
	{
	const apiDataDiv = containerRef.querySelector(".api-data");
    if (apiDataDiv == null) return;
	const result = await fetchDailyApiData(date, eventKey);
	if (result.success) {
		apiDataDiv.innerHTML = `
			<div class="api-data-body">${result.body}</div>
			<div class="api-data-copyright">${result.reference}</div>
		`;
    } else {
		apiDataDiv.innerHTML = result.error ?? "";
		// setApiError(result.error);
		if (result.skipDate) {
			return; // Do not set date 
		}
    }
	if (updateDate) {
		setApiDataDate(containerRef, date);
	}
}

interface FetchSuccess {
    success: true;
    body: string;
    reference: string;
}

interface FetchFailure {
    success: false;
    skipDate: boolean;
    error: string;
}

type FetchResult = FetchSuccess | FetchFailure;

async function fetchDailyApiData(date: Date, eventKey: string = "Events"): Promise<FetchResult>  {
	// if (no proxy) // for additional parameter to select proxy, otw try catch try proxy
	// const apiUrl = getApiUrl(date);
	// console.log("apiUrl:", apiUrl);

	const proxyPath = getProxyUrl(date);

	const mapResponse = (data: any, key: string) => ({
		body: data?.[key]?.[0]?.text ?? "",
		reference: data?.[key]?.[0]?.html ?? ""
	});

    return fetchWithRetry(proxyPath)
		.then((jsondta) => {
			const { body, reference } = mapResponse(jsondta?.data, eventKey);
			if (body) {
				console.log("jsondta.data:", jsondta.data);
				return { success: true as const, body: body, reference: reference };
			} else {
				if (jsondta == "Too many requests.") {
					return { success: false as const, skipDate: false, error: "Too many requests. Please wait at least 30 seconds." };
				} else {
					return { success: false as const, skipDate: false, error: "No data found. Try reloading page." };
				}
			}
		})
		.catch((error: any) => {
			console.error("Error:", error);
			return { success: false as const, skipDate: true, error: "An unexpected error occurred." };
		});
}

export async function refreshRawJsonData(rawJsonRef: HTMLElement, date: Date) {
    if (!rawJsonRef) return;

	rawJsonRef.innerHTML = "Loading raw data...";
	const proxyPath = getProxyUrl(date);
	fetchWithRetry(proxyPath)
		.then((jsondta) => {
			rawJsonRef.innerHTML = renderValueCollapsible(jsondta);
		})
}

// function renderValueRecursive(val: any): string {
//   if (val === null) return `<span class="null">null</span>`;
//   if (typeof val !== 'object') return `<span>${val}</span>`;

//   if (Array.isArray(val)) {
//     return `<ul>${val.map(item => `<li>${renderValueRecursive(item)}</li>`).join('')}</ul>`;
//   }

//   // Plain object
//   return `<dl>
//     ${Object.entries(val).map(([k, v]) =>
//       `<dt><b>${k}</b></dt><dd>${renderValueRecursive(v)}</dd>`
//     ).join('')}
//   </dl>`;
// }

function renderValueCollapsible(val: any, key: string = ''): string {
  if (val === null || typeof val !== 'object') {
    return `${key ? `<b>${key}:</b> ` : ''}${val}`;
  }

  const entries = Array.isArray(val)
    ? val.map((v, i) => renderValueCollapsible(v, i.toString()))
    : Object.entries(val as Record<string, unknown>).map(([k, v]) => renderValueCollapsible(v, k));

  const label = key
    ? `${key} (${Array.isArray(val) ? `${val.length} items` : 'object'})`
    : 'root';

  return `<details open>
    <summary>${label}</summary>
    <div style="padding-left:1em">${entries.join('<br>')}</div>
  </details>`;
}

function setApiDataDate(containerRef: HTMLElement, date: Date) {
	const monthName = date.toLocaleString("default", { month: "long" });
	const apiDataDate = containerRef.querySelector(".api-data-date");
	if (apiDataDate == null) return;
	apiDataDate.innerHTML = `Daily feed for ${monthName} ${date.getDate()}.`;
	console.log("api data date element:", apiDataDate);
}

function getProxyUrl(date: Date, padded: boolean = true) {
	const apiUrl = getApiUrl(date, padded);
	return `${dailyFeedBlock.ajaxUrl}?action=api_proxy&url=${apiUrl}`;
}

function getApiUrl(date: Date, padded: boolean = true) {
	let dayNum = date.getDate();
	let day = dayNum.toString()
	if (padded == true && dayNum < 10) {
		day = "0" + day;
	}
	let month = date.getMonth() + 1;
	return `https://today.zenquotes.io/api/${month}/${day}`;
}

// function fetchJsonAsync(url: string) {
// 	return new Promise((resolve, reject) => {
// 		fetch(url)
// 			.then((res) => res.json())
// 			.then((jsondta) => resolve(jsondta))
// 			.catch((error) => {
// 				console.error(error);
// 				reject(error);
// 			});
// 	});
// }

async function fetchWithRetry(url: string, options: RequestInit = {}, retries: number = 3, delay: number = 1000) {
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
		} catch (err: any) { // to check?
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
