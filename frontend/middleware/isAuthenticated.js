export default function ({ $auth, redirect }) {
  //check loggedIn "false"
  if (!$auth.loggedIn) {
    return redirect("/authenticated/login");
  }
  //check authenticated role
  if ($auth.strategy.name != "authenticated") {
    return redirect("/authenticated/login");
  } else {
    return;
  }
}
