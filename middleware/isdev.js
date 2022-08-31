export default function ({ $auth, redirect }) {
  if ($auth.$state.user.roleId !== 9) {
    return redirect('/')
  }
}
