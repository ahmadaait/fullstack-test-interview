export default function ({ $auth, redirect }) {
  //check loggedIn "false"
  if (!$auth.loggedIn) {
    return redirect("/login");
  }
  //check authenticated role
  if ($auth.strategy.name != "authenticated") {
    return redirect("/login");
  } else {
    return;
  }
}
