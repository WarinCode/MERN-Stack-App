const headers = {
  headers: {
    "Content-Type": "application/json",
  }
}

export const fetchBook = async (apiUrl, path) => {
  try {
    const response = await fetch(`${apiUrl}${path}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

export const insert = async (apiUrl, path, body) => {
  const options = {
    method: "POST",
    ...headers,
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(`${apiUrl}${path}`, options);
    const { acknowledged } = await response.json();
    return acknowledged;
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

export const update = async (apiUrl, path, body) => {
  const options = {
    method: "PUT",
    ...headers,
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(`${apiUrl}${path}`, options);
    const { modifiedCount } = await response.json();
    return modifiedCount;
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

export const remove = async (apiUrl, path) => {
  const options = {
    method: "DELETE",
    ...headers,
  };
  try {
    const response = await fetch(`${apiUrl}${path}`, options);
    const { deletedCount } = await response.json();
    return deletedCount;
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

export const search = async (apiUrl, path) => {
  try {
    const response = await fetch(`${apiUrl}${path}`);
    const data = await response.json();
    if (data === null) {
      throw new Error("ไม่มีสินค้าชิ้นนี้อยู่ในฐานข้อมูล!");
    } else {
      return data;
    }
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

export const fetchISBNs = async (apiUrl, path) => await fetchBook(apiUrl, path);