#!/usr/bin/env node

import axios from 'axios';

const apiUrl = "https://api.github.com"

const [nodePath, scriptPath, startDate, endDate] = process.argv;

async function getTopRepos(startDate, endDate) {
	const endPoint = "/search/repositories";

	// date query
	var dateQuery = 'stars:>0'
	if (!startDate && endDate) {
		var dateQuery = `created<${endDate}` 
	}
	else if (!endDate && startDate) {
		var dateQuery = `created>${startDate}`
	}
	else if (startDate && endDate) {
		var dateQuery = `created:${startDate}..${endDate}`
	}

	const sortQuery = 'sort=stars'
	const orderQuery = 'order=desc'
	const perPageQuery = 'per_page=1'; // Limit to 5 repositories

	// Build the query string dynamically
	const queryParts = [];
	if (dateQuery) queryParts.push(`q=${dateQuery}`);
	if (sortQuery) queryParts.push(sortQuery);
	if (orderQuery) queryParts.push(orderQuery);
	if (perPageQuery) queryParts.push(perPageQuery);

	const apiQuery = `?${queryParts.join('&')}`;
	const fullUrl = apiUrl + endPoint + apiQuery
	const response = await axios.get(fullUrl, {
		headers: { 'Accept': 'application/vnd.github.v3+json'} // recommended parameters
	});
	console.log("fullurl:" + fullUrl)
	return response.data;
}

// placeholder
console.log(await getTopRepos(startDate, endDate))