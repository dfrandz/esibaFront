const base_url: string = "https://chroniclingamerica.loc.gov/lccn/";
import axios from 'axios';
import { ApiResponse } from '../../models/api-response';
import { getToken } from '../../helpers/myfunc';



let token: string = JSON.parse(localStorage.getItem('token') || '""')

export const getData = async (url: string): Promise<ApiResponse> => {
	let data: ApiResponse;
	const headers = new Headers();
	// headers.append('Content-Type', 'application/json');
	// headers.append('Accept', 'application/json');
	// headers.append('Authorization', 'Bearer ' + token);

	const response = await fetch(base_url + url, {
		method: 'GET',
		headers: headers,
		// mode: 'no-cors',
		// credentials: 'include',
	});
	
	data = await response.json();
	return data;

}

/**
 *postData function
 * send simple http request without authorization
 * @param url
 * @param payload
 * @returns
 */

export const postData = async (url: string, payload:any): Promise<ApiResponse> => {
	let data: ApiResponse;
	try {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('X-Requested-With', 'XMLHttpRequest');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Credentials', 'true');
		const response = await fetch(base_url + url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(payload),
		});

		if (response.ok) {
			data = await response.json();
			return {
				status: response.status,
				success: true,
				message: data.message,
				result: data,
				errors: null,
			};
		} else {
			console.log(response.status);
			let error = await response.json();
			return {
					success: false,
					message: error.message,
					result: null,
					errors: error.errors,
					except: error.except,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: undefined,
			success: false,
			message: 'Erreur de connexion',
			result: [],
			errors: "Erreur de connexion à l'api",
		};
	}

}

/**
 * postDataWithToken function
 * send hhtp request with authorization bearer
 * @param url
 * @param payload
 * @returns response
 */

export const postDataWithToken = async (url: string, payload?: any): Promise<ApiResponse> => {
	let data: ApiResponse;
	try {
		const token = getToken();
		if (token !== null) {
			
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			// headers.append('Content-Type', 'multipart/form-data');

			headers.append('Accept', 'application/json');
			headers.append('X-Requested-With', 'XMLHttpRequest');
			headers.append('Access-Control-Allow-Origin', '*');
			headers.append('Access-Control-Allow-Credentials', 'true');

			//headers.append('origin', 'http://192.168.1.75:5173');
			headers.append('Authorization', 'Bearer ' + token);
			const response = await fetch(base_url + url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(payload),
				mode: 'cors',
			});
			//console.log(headers);
			if (response.status === 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/';
			}

			if (response.ok) {
				data = await response.json();
				return data;
			} else {
				console.log(response);
				const error = await response.json();
				data = {
					status: undefined,
					success: false,
					message: error.message,
					result: [],
					errors: error.errors,
					except: error.except,
				};
				return data;
			}
		} else {
			return {
				success: false,
				message: 'Token not found',
				result: [],
				status: undefined,

			}
		}

	} catch (error) {
		return {
			status: undefined,
			success: false,
			message: 'Erreur de connexion',
			result: [],
			errors: "Erreur de connexion à l'api",
		};
	}
}

/**
 * postDataWithFile
 * send http request with file
 * @param url
 * @param payload
 * @returns response
 */

export const postDataWithFile = async (url: string, payload?: any): Promise<ApiResponse> => {
	let response: ApiResponse;
	try {
		// const token = getCookie('token');
		const res = await axios.post(base_url + url, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		});
		response = res.data;
	
	} catch (error:any) {
		response = {
			status: undefined,
			success: false,
			message: 'Erreur de connexion',
			result: [],
			errors: error.response.data
		};
	}

	return response;
}
