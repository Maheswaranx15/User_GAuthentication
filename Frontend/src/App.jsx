import Login from "./Login"
import Signup from "./Signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Verification from './Verificationpage'
import Home from './Home'
import ForgotPassword from "./ForgetPassword"
import ResetPassword from './ResetPassword';
import UserProfilePage from './profile'
import UpdatePassword from './UpdatePassword'
import TwoFactorAuthPage from '../src/Twofactor'
import MasterTraderForm from './MastertraderPage'
import TierUpgradePage from './TierUpgrade'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/verify/:id" element={<Verification />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/UserProfilePage/:data_id/:data_mail" element={<UserProfilePage />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/Twofactor/:data_id/:data_mail" element={<TwoFactorAuthPage />} />
        <Route path="/MasterTraderForm/:data_id" element={<MasterTraderForm />} />
        <Route path="/TierUpgradePage/:data_id" element={<TierUpgradePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
