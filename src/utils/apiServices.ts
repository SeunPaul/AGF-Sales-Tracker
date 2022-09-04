/* eslint-disable class-methods-use-this */
const baseURL = "http://localhost:8080";

const getAccessToken = () => sessionStorage.getItem("accessToken") || "";

type CreateUserParameters = {
  username: string;
  password: string;
  role: "user" | "admin" | "super admin";
};

type LoginParameters = {
  username: string;
  password: string;
};

type EditUserParameters = {
  userId: string;
  username: string;
  password?: string;
  role: "user" | "admin" | "super admin";
};

type UpdatePasswordParameters = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type CreateOrderParameters = {
  customer_name: string;
  country: string;
  state: string;
  city: string;
  address: string;
  phone_number: string;
  email: string;
  brand: string;
  production_manager: string;
  sm_manager: string;
  uploader?: string;
  items: {
    item_ordered: string;
    item_cost: number;
    cutter: string;
    stitcher: string;
    cut_cost: number;
    tailoring_fee: number;
  }[];
};

class APIServices {
  // users
  async createUser(data: CreateUserParameters) {
    const accessToken = getAccessToken();
    const response = await fetch(`${baseURL}/user/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return {
      message: `${response.statusText}. unable to create user`,
    };
  }

  async getProfile() {
    const accessToken = getAccessToken();

    const response = await fetch(`${baseURL}/user/profile`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to get profile` };
  }

  async getUsers(data: CreateUserParameters) {
    const accessToken = getAccessToken();
    const response = await fetch(`${baseURL}/user/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return {
      message: `${response.statusText}. unable to get users`,
    };
  }

  async login(data: LoginParameters) {
    const response = await fetch(`${baseURL}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to login` };
  }

  async editUser(data: EditUserParameters) {
    const accessToken = getAccessToken();

    const response = await fetch(`${baseURL}/user/edit/${data.userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to update user` };
  }

  async deleteUser(data: { userId: string }) {
    const accessToken = getAccessToken();

    const response = await fetch(`${baseURL}/user/delete/${data.userId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to delete user` };
  }

  async logout() {
    sessionStorage.clear();

    return { message: "Logged Out" };
  }

  async updatePassword(data: UpdatePasswordParameters) {
    const accessToken = getAccessToken();

    const response = await fetch(`${baseURL}/user/change/password`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to update password` };
  }

  // orders
  async createOrder(data: CreateOrderParameters) {
    const accessToken = getAccessToken();
    const response = await fetch(`${baseURL}/order/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return {
      message: `${response.statusText}. unable to create order`,
    };
  }

  async getOrders() {
    const accessToken = getAccessToken();
    const response = await fetch(`${baseURL}/order/orders`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return {
      message: `${response.statusText}. unable to get orders`,
    };
  }

  async deleteOrder(data: { orderId: string }) {
    const accessToken = getAccessToken();
    const response = await fetch(`${baseURL}/order/delete/${data.orderId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok || response.status === 401) {
      return response.json();
    }

    return {
      message: `${response.statusText}. unable to delte order`,
    };
  }
}

const instance = new APIServices();

export default instance;
