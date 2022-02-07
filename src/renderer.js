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
  api.receive("sftp-listing", entries => {
    lines = "";
    for (const entry of entries) {
      lines += `<li>${entry}</li>\n`;
    }
    document.getElementById("dry-run").innerHTML = lines;
  });
});
