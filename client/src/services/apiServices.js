const rootUrl = 'http://localhost:3000';

const apiService = {};

apiService.register = (user) => {
  return fetch(rootUrl + '/register', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user),
  }).then((data) => data.json()).catch((err) => {
    console.log(err);
  });
};

apiService.login = (user) => {
  return fetch(rootUrl + '/login', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user),
  }).then((data) => data.json())
    .catch((err) => {
      console.log(err);
    });
};
apiService.getUsers = () => {
    return fetch(rootUrl + '/users').then(res => res.json());
};
apiService.createTask = (task) => {
  return fetch(rootUrl + '/task', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(task),
  }).then((data) => data.json()).catch((err) => {
    console.log(err);
  });
};

apiService.getTasks = (id) => {
  return fetch(rootUrl + `/task/${id}`).then(res => res.json());
}
apiService.updateProgress = (id, isComp) => {
  return fetch(rootUrl + `/task/${id}/` + (isComp ? 'comp' : 'inpro'), {
    method: "PUT",
    mode: "cors"
  }).then((data) => data.json()).catch((err) => {
    console.log(err);
  });
};

apiService.updateOverdue = (id) => {
  return fetch(rootUrl + `/task/${id}/overdue`, {
    method: "PUT",
    mode: "cors"
  }).then((data) => data.json()).catch((err) => {
    console.log(err);
  });
};

apiService.delete = (id) => {
  return fetch(rootUrl + `/task/${id}`, {
    method: "DELETE",
    mode: "cors"
  }).then(res => res.json());
}


export default apiService;