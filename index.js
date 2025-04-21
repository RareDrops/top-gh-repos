#!/usr/bin/env node

import axios from 'axios';

const apiUrl = "https://api.github.com"

const [nodePath, scriptPath, startDate, endDate, limit] = process.argv;

async function getTopRepos(startDate, endDate, limit=5) {
	// convert date to ISO-8601 format(YYYY-MM-DD)
	try {
		if (startDate) {
			var [startDay, startMonth, startYear] = startDate.split("-");
			var startDate = new Date(`${startYear}-${startMonth}-${startDay}`).toISOString().split('T')[0];
		}
		if (endDate) {
			var [endDay, endMonth, endYear] = endDate.split("-");
			var endDate = new Date(`${endYear}-${endMonth}-${endDay}`).toISOString().split('T')[0];
		}
	} catch (error) {
		console.log(`${error.name}: ${error.message}\nUsage: top-gh-repos [options]\nArguments:\n	start-date      Start date in DD-MM-YYYY format (e.g., 01-01-2023)\n	end-date        End date in DD-MM-YYYY format (e.g., 31-12-2023)\n	limit           Number of repositories to fetch (default: 5)\n\nExamples:\n	top-gh-repos 01-01-2023 31-12-2023         # Fetch top 5 repos from Jan to Dec 2023\n	top-gh-repos 01-01-2023 31-12-2023 10      # Fetch top 10 repos from Jan to Dec 2023
    `)
		process.exit(1)
	}

	const endPoint = "/search/repositories";

	// date query
	var dateQuery = 'stars:>0';
	if (!startDate && endDate) {
		var dateQuery = `created:<${endDate}`;
	}
	else if (!endDate && startDate) {
		var dateQuery = `created:>${startDate}`;
	}
	else if (startDate && endDate) {
		var dateQuery = `created:${startDate}..${endDate}`;
	}

	const sortQuery = 'sort=stars'
	const orderQuery = 'order=desc'
	const perPageQuery = `per_page=${limit}`; // Limit to 5 repositories

	// Build the query string dynamically
	const queryParts = [];
	if (dateQuery) queryParts.push(`q=${dateQuery}`);
	if (sortQuery) queryParts.push(sortQuery);
	if (orderQuery) queryParts.push(orderQuery);
	if (perPageQuery) queryParts.push(perPageQuery);

	const apiQuery = `?${queryParts.join('&')}`;
	const fullUrl = apiUrl + endPoint + apiQuery

	let response;
	try {
		response = await axios.get(fullUrl, {
			headers: { 'Accept': 'application/vnd.github+json'} // recommended parameters
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
	console.log("Full Url: " + fullUrl)

	let results_list = []
	// Build the data table
	const data_items = response.data["items"]

	for (let i = 0; i < response.data["items"].length; i++) {
		var data_attr = data_items[i]
	
		const data_table = {
			"name": data_attr["full_name"],
			"description": data_attr["description"],
			"url":  data_attr["html_url"],
			"stars": data_attr["stargazers_count"],
		}

		results_list.push(data_table)
	}

	return results_list;
}

// placeholder
const topRepos = await getTopRepos(startDate, endDate, limit)
console.log(topRepos)