const createRequest = async <T = unknown, R = unknown>({
  url,
  method,
  data,
}: {
  url: string;
  method: 'GET' | 'POST' | 'DELETE';
  data?: T;
}): Promise<R> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Network error: Failed to connect to server'
    );
  }
};

export default createRequest;