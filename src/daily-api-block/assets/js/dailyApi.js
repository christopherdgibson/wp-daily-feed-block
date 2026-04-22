export function fetchDailyApiData(containerRef, date) {
	const apiDataDiv = containerRef.querySelector(".api-data");
	console.log("apiDataDiv:", apiDataDiv);
	if (!apiDataDiv) return;
	// console.log("entered if(apiDataDiv) block", apiDataDiv);
	const apiUrl = getApiDataUrl(date);
	console.log("apiUrl:", apiUrl);
	const apiPath = `/wordpress-6.9/wordpress/wp-admin/admin-ajax.php?action=api_proxy&url=${apiUrl}`;
	
	fetchWithRetry(apiPath)
		.then((jsondta) => {
			if (jsondta == null) {
				console.log("jsondta null");
				return;
			}
			console.log("jsondta:", jsondta);
			console.log("jsondta.data:", jsondta.data);
			let dataObj;
			const tempDiv = document.createElement("div");
			let bodyHTML = document.createElement("div");
			bodyHTML.className = "api-data-body";
			let referenceHTML = document.createElement("div");
			referenceHTML.className = "api-data-copyright";
			let outputHTML = "";
			dataObj = jsondta.data;
			console.log("dataObj", dataObj);
			//need if statement here so dataObj isn't null
			bodyHTML.innerHTML = dataObj.Events[0].text;
			referenceHTML.innerHTML = dataObj.Events[0].html;
			outputHTML += bodyHTML.outerHTML;
			outputHTML += referenceHTML.outerHTML;
			setApiDataDate(containerRef, date);
			apiDataDiv.innerHTML =
				outputHTML || "No data found. Try reloading page.";
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
