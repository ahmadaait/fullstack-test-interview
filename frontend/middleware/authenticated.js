export default function ({ $auth, redirect }) {
  //check loggedIn "true"
  if ($auth.loggedIn) {
    //check role authenticated
    if ($auth.strategy.name == "authenticated") {
      return redirect("/authenticated/dashboard");
    }
  }
}
