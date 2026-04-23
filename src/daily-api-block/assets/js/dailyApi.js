export function fetchDailyApiData(containerRef, date) {
    const apiDataDiv = containerRef.querySelector(".api-data");
    if (!apiDataDiv) return;
	const apiUrl = getApiDataUrl(date);
	console.log("apiUrl:", apiUrl);
	const apiPath = `/wordpress-6.9/wordpress/wp-admin/admin-ajax.php?action=api_proxy&url=${apiUrl}`;
	
    fetchWithRetry(apiPath)
        .then((jsondta) => {
            const event = jsondta?.data?.Events?.[0];
            if (!event) {
                apiDataDiv.innerHTML = "No data found. Try reloading page.";
                return;
            }
			console.log("jsondta:", jsondta);
			console.log("jsondta.data:", jsondta.data);
            		console.log("events", event);
            apiDataDiv.innerHTML = `
                <div class="api-data-body">${event.text}</div>
                <div class="api-data-copyright">${event.html}</div>
            `;
            console.log('apiDataDiv.innerHTML: ', apiDataDiv.innerHTML);
			
            setApiDataDate(containerRef, date);
        })
        .catch((error) => console.error("Error:", error));
}

function setApiDataDate(containerRef, date) {
	const monthName = date.toLocaleString("default", { month: "long" });
	const apiDataDate = containerRef.querySelector(".api-data-date");
	apiDataDate.innerHTML = `Daily api data for ${monthName} ${date.getDate()}.`;
	console.log("api data date element:", apiDataDate);
}

function getApiDataUrl(date, padded = true) {
	let day = date.getDate();
	if (padded == true && day < 10) {
		day = "0" + day;
	}
	let month = date.getMonth() + 1;
	return `https://today.zenquotes.io/api/${month}/${day}`;
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
				console.log("data missing expected structure error:", data);
				throw new Error("API data missing expected structure");
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
