import { useState, useEffect } from 'react';

const postData = async (url, requestBody) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

export default postData
