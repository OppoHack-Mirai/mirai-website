export function showAuthScreen() {
    var url = window.location.href;
    var location = url.substring(url.lastIndexOf('/') + 1)
    if(location != "register" && location != "login") {
      window.location.replace("/register");
    }
}
  
  
export function showHomeScreen() {
    var url = window.location.href;
    var location = url.substring(url.lastIndexOf('/') + 1)
    if(location != "" && location != "nodes" && location != "settings") {
      window.location.replace("/");
    }
}
  