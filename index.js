#!/usr/bin/env node

import axios from 'axios';

const apiUrl = "https://api.github.com"

const [nodePath, scriptPath, startDate, endDate] = process.argv;

async function getTopRepos(startDate, endDate) {
	const endPoint = "/search/repositories";
	const apiQuery = `?q=created:${startDate}..${endDate}&sort=stars&order=desc`;
	const response = await axios.get(apiUrl + endPoint + apiQuery, {
		headers: { ' Accept': 'application/vnd.github.v3+json'} // recommended parameters
	});
	return response.data;
}

// placeholder
console.log(await getTopRepos("2011-01-01", "2012-01-01"))