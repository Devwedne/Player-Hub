const API_BASE_URL = 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getErrorMessage(response) {
  try {
    const data = await response.json();
    return data.message || data.error || data.erro || `Erro ${response.status}`;
  } catch {
    return `Erro ${response.status}`;
  }
}

window.api = {
  get(path) {
    return request(path);
  },

  post(path, body) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(path, body) {
    return request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(path) {
    return request(path, {
      method: 'DELETE',
    });
  },
};
