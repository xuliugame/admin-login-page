import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export async function login({ username, password }) {
  try {
    const data = await axiosInstance.post('/login', { username, password });
    if (data.status === 200 && data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('name', data.data.name);
      localStorage.setItem('isAdmin', data.data.isAdmin);
      return true;
    }
  }catch (e) {
    alert(e.message);
  }
}

export async function register({ username, password, repeatPassword, isAdmin }) {
  try {
    const data = await axiosInstance.post('/register', { username, password, repeatPassword, isAdmin });
    console.log(data);
    if (data.status === 200) {
      alert('register success');
      return true;
    }
  } catch (e) {
      console.log(e.response.data.message);
    alert(`register fail, ${e.response.data.message}`);
  }
}

export async function record({ name }) {
  try {
    await axiosInstance.post('/record', { name });
  } catch (e) {
    console.log(e)
  }
}
export async function getFiles() {
  try {
    const temp = await axiosInstance.get('/files');
    if (temp.status === 200) {
      return temp.data;
    }
  } catch (e) {
      console.log(e)
        return [];
  }
}

export async function deleteFiles(file) {
    try {
        const temp = await axiosInstance.delete(`/files/${file}`);
        return temp.status === 200;

    } catch (e) {
        return false;
    }
}

export async function uploadFile(file) {
    try {
        const temp = await axiosInstance.post('/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (temp.status === 200) {
            return true;
        }
    } catch (e) {
        console.log(e)
        alert(e.response.data.message);
        return false;
    }
}
