const headers = {
  headers: {
    "Content-Type": "application/json",
  }
}

/*  function สำหรับการดึงข้อมูลจากฐานข้อมูลใช้ใน method GET */
export const fetchProduct = async (apiUrl, path) => {
  try {
    const response = await fetch(`${apiUrl}${path}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e?.name, e?.message);
    return null;
  }
};

/* function สำหรับการเพิ่มข้อมูลในฐานข้อมูลใช้ใน method POST  */
export const insertProduct = async (apiUrl, path, body) => {
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

/* function สำหรับการอัปเดตแก้ไขสินค้าในฐานข้อมูลใช้ใน method PUT */
export const updateProduct = async (apiUrl, path, body) => {
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

/* function สำหรับการลบข้อมูลสินค้าในฐานข้อมูลใช้ใน method DELETE */
export const deleteProduct = async (apiUrl, path) => {
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

/* function สำหรับการตรวจสอบสินค้าว่ามีอยู่ในฐานข้อมูลหรือไม่ใช้ใน method GET */
export const searchProduct = async (apiUrl, path) => {
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

export const uploadFile = async (apiUrl, path, body) => {
  return await insertProduct(apiUrl, path, body);
}