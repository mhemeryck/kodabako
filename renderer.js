window.addEventListener("DOMContentLoaded", () => {
  // event listener for connecting to SFTP
  document.getElementById("submit-details").addEventListener("click", () => {
    const form = document.forms["connection-details"];
    // send data to main process
    api.send("credentials", {
      username: form["username"].value,
      password: form["password"].value,
      host: form["host"].value,
      port: form["port"].value
    });
  });

  // Incoming event from main process
  api.handle(
    "sftp-listing",
    (event, listing) =>
      function(event, listing) {
        document.getElementById("dry-run").innerHTML = listing[0].name;
      },
    event
  );
});
