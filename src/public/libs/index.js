// (function () {
//   const form = document.querySelector("#login-form");
//   const input = document.querySelector("#password");
//   if (form && input) {
//     form.addEventListener("submit", (e) => {
//       // verify user password
//       e.preventDefault();
//       const password = input.value.trim();
//       if (password == "") {
//         oAlert({
//           desc: "Password field is empty!",
//           okay: { text: "OK" },
//         }).then(() => {
//           form.reset();
//           input.focus();
//         });
//         const okBtn = document.querySelector("#o-alert .okBtn");
//         if (okBtn) okBtn.focus();
//         return;
//       }
//       const credentials = getCredentials();
//       if (!credentials) return;
//       if (!exists(password, credentials.secrets)) {
//         oAlert({
//           desc: "Wrong password!",
//           okay: { text: "Try again" },
//         }).then(() => {
//           form.reset();
//           input.focus();
//         });
//         const okBtn = document.querySelector("#o-alert .okBtn");
//         if (okBtn) okBtn.focus();
//         return;
//       }

//       // get notes
//       let data = getNotes();
//       if (!data) return;
//       init(data);
//     });
//   }
// })();
