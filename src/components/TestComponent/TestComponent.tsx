import React, { useState } from 'react';
import apiService from '../../api/apiService';

const TestComponent: React.FC = () => {
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const handleGet = async () => {
        try {
            const response = await apiService.get('/your-get-endpoint');
            setResponseData(response);
        } catch (err) {
            setError('GET request failed');
            console.error(err);
        }
    };

    const handlePost = async () => {
        try {
            const postData = {
               
            };
            const response = await apiService.post(
                '/your-post-endpoint',
                postData
            );
            setResponseData(response);
        } catch (err) {
            setError('POST request failed');
            console.error(err);
        }
    };

    const handlePut = async () => {
        try {
            const putData = {
              
            };
            const response = await apiService.put(
                '/your-put-endpoint',
                putData
            );
            setResponseData(response);
        } catch (err) {
            setError('PUT request failed');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await apiService.delete('/your-delete-endpoint');
            setResponseData(response);
        } catch (err) {
            setError('DELETE request failed');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Test API Requests</h1>
            <button onClick={handleGet}>GET Request</button>
            <button onClick={handlePost}>POST Request</button>
            <button onClick={handlePut}>PUT Request</button>
            <button onClick={handleDelete}>DELETE Request</button>
            <div>
                <h2>Response:</h2>
                {error && <p>Error: {error}</p>}
                {responseData && (
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                )}
            </div>
        </div>
    );
};

export default TestComponent;
