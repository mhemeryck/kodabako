window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit-details").addEventListener("click", () => {
    const form = document.forms['connection-details']
    data = {
      username: form["username"].value,
      password: form["password"].value,
      port: form["port"].value
    };
    console.log(data);

    // send data to main process
    api.send("credentials", data);
  });
});
