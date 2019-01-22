import camelcaseKeys from 'camelcase-keys';

const Expresso = {};
const baseUrl = process.env.API_URL || 'http://localhost:4000/api/v1';

Expresso.getEmployeeList = () => {
  const url = `${baseUrl}/employees`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.employees.map(employee => camelcaseKeys(employee));
    });
  });
};

Expresso.getEmployee = id => {
  const url = `${baseUrl}/employees/${id}`;
  return fetch(url).then(response => {
    const emptyEmployee = {
      isCurrentEmployee: 1,
      name: '',
      position: '',
      wage: 0
    };
    if (!response.ok) {
      return new Promise(resolve => resolve(emptyEmployee));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.employee);
    });
  });
};

Expresso.createEmployee = employee => {
  const url = `${baseUrl}/employees`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employee })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyEmployee = {
        isCurrentEmployee: 1,
        name: '',
        position: '',
        wage: 0
      };
      return new Promise(resolve => resolve(emptyEmployee));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.employee);
    });
  });
};

Expresso.updateEmployee = employee => {
  const url = `${baseUrl}/employees/${employee.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employee })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyEmployee = {
        isCurrentEmployee: 1,
        name: '',
        position: '',
        wage: 0
      };
      return new Promise(resolve => resolve(emptyEmployee));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.employee);
    });
  });
};

Expresso.restoreEmployee = employee => {
  employee.isCurrentEmployee = 1;
  const url = `${baseUrl}/employees/${employee.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employee })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyEmployee = {
        isCurrentEmployee: 1,
        name: '',
        position: '',
        wage: 0
      };
      return new Promise(resolve => resolve(emptyEmployee));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.employee);
    });
  });
};

Expresso.deleteEmployee = id => {
  const url = `${baseUrl}/employees/${id}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Expresso.getMenuList = () => {
  const url = `${baseUrl}/menus`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.menus.map(menu => camelcaseKeys(menu));
    });
  });
};

Expresso.getMenu = id => {
  const url = `${baseUrl}/menus/${id}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve({ title: '' }));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.menu);
    });
  });
};

Expresso.createMenu = menu => {
  const url = `${baseUrl}/menus`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menu })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve({ title: '' }));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.menu);
    });
  });
};

Expresso.updateMenu = menu => {
  const url = `${baseUrl}/menus/${menu.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menu })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve({ title: '' }));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.menu);
    });
  });
};

Expresso.deleteMenu = id => {
  const url = `${baseUrl}/menus/${id}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Expresso.getMenuItems = menuId => {
  const url = `${baseUrl}/menus/${menuId}/menu-items`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.menuItems.map(menuItem => camelcaseKeys(menuItem));
    });
  });
};

Expresso.createMenuItem = (menuItem, menuId) => {
  const url = `${baseUrl}/menus/${menuId}/menu-items`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menuItem })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyMenuItem = {
        description: '',
        inventory: 0,
        menuId,
        name: '',
        price: 0
      };
      return new Promise(resolve => resolve(emptyMenuItem));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.menuItem);
    });
  });
};

Expresso.updateMenuItem = (menuItem, menuId) => {
  const url = `${baseUrl}/menus/${menuId}/menu-items/${menuItem.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menuItem })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyMenuItem = {
        description: '',
        inventory: 0,
        menuId,
        name: '',
        price: 0
      };
      return new Promise(resolve => resolve(emptyMenuItem));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.menuItem);
    });
  });
};

Expresso.deleteMenuItem = (menuItemId, menuId) => {
  const url = `${baseUrl}/menus/${menuId}/menu-items/${menuItemId}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Expresso.getTimesheets = employeeId => {
  const url = `${baseUrl}/employees/${employeeId}/timesheets`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.timesheets.map(timesheet => camelcaseKeys(timesheet));
    });
  });
};

Expresso.createTimesheet = (timesheet, employeeId) => {
  const url = `${baseUrl}/employees/${employeeId}/timesheets`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timesheet })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyTimesheet = {
        hours: 0,
        rate: this.state.employee.wage,
        date: Date.now(),
        employeeId: this.state.employee.id
      };
      return new Promise(resolve => resolve(emptyTimesheet));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.timesheet);
    });
  });
};

Expresso.updateTimesheet = (timesheet, employeeId) => {
  const url = `${baseUrl}/employees/${employeeId}/timesheets/${timesheet.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timesheet })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      const emptyTimesheet = {
        hours: 0,
        rate: this.state.employee.wage,
        date: Date.now(),
        employeeId: this.state.employee.id
      };
      return new Promise(resolve => resolve(emptyTimesheet));
    }
    return response.json().then(jsonResponse => {
      return camelcaseKeys(jsonResponse.timesheet);
    });
  });
};

Expresso.deleteTimesheet = (timesheetId, employeeId) => {
  const url = `${baseUrl}/employees/${employeeId}/timesheets/${timesheetId}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

export default Expresso;
