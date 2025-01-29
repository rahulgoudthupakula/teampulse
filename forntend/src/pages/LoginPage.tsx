import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { authService } from "../services/authService"
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [slideIndex, setSlideIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [formType, setFormType] = useState('login')
  const [otp, setOtp] = useState("")
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email');
    };
  };
  const clearError = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 7);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission based on formType
    const response = await authService.login(email, password);
    if (response) {
      
      navigate('/home'); // Navigate to the dashboard or desired route
    } else {
      // Handle login failure
      console.error('Login failed');
    }
    
  }

  const renderForm = () => {
    switch (formType) {
      case 'otp':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Id
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent"
                placeholder="Enter your email"
                
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors">
              Login with OTP
            </button>
            <button 
              onClick={() => setFormType('login')} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Login
            </button>
          </>
        )
      case 'forgot':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Id
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <button className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors">
              Reset Password
            </button>
            <button 
              onClick={() => setFormType('login')} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Login
            </button>
          </>
        )
      default:
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Id
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onBlur={validateEmail}
                onFocus={clearError}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Enter Your Password
                </label>
                <button 
                  onClick={() => setFormType('otp')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Login via OTP
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setFormType('forgot')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </button>
            </div>
            <button className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors">
              Login
            </button>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-1 p-4 bg-white rounded-s-3xl">
        {/* Left side with image and job types */}
        <div className="relative bg-[#FFC107] rounded-3xl p-8 hidden md:block">
          <div className="absolute top-4 left-4">
            <span className="text-2xl font-bold text-blue-900">Team</span>
          </div>
          
          <div className="slideshow-container">
            {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
              <div key={num} className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}>
                <img src={`/img/login-img-${num}.png`} alt={`Login slide ${num}`} className="w-[88%] h-[77%]" />
              </div>
            ))}
            <div className="dots-container">
              {[...Array(7)].map((_, i) => (
                <span key={i} className={`dot ${i === slideIndex ? 'active' : ''}`}></span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side with login form rammm */}
        <div className="flex flex-col justify-center  p-4 h-[500px] overflow-scroll">
          <div className="mb-8 mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                👋
              </span>
              <span className="text-gray-600">Hi, There</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back to Unstop!</h1>
          </div>
          <div className=" flex gap-4">
            <button className="w-full mb-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg  hover:bg-gray-50 transition-colors">
              <img src="/google.png?height=24&width=24" alt="Google" className="w-6 h-6" />
              Login with Google
            </button>

            <button className="w-full mb-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <img src="/linkedin-.webp?height=24&width=24" alt="LinkedIn" className="w-6 h-6" />
              Login with LinkedIn
            </button>
          </div>
          

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or login with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderForm()}
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/register">Sign up</a>
          </p>

        </div>
      </div>
      <style >{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }
        .login-left {
          flex: 1;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .logo {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .logo h2 {
          font-size: 2.5rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .logo span {
          color: #4a90e2;
        }
        .slideshow-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .mySlides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .mySlides.active {
          opacity: 1;
        }
        .mySlides img {
          
          object-fit: cover;
        }
        .dots-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 10;
        }
        .dot {
          height: 10px;
          width: 10px;
          background-color: rgba(255,255,255,0.5);
          border-radius: 50%;
          display: inline-block;
          margin: 0 5px;
          transition: background-color 0.3s ease;
        }
        .dot.active {
          background-color: #fff;
        }
        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          height: 100%;
        }
        .login-box {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
        }
        .login-box h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .login-box p {
          color: #666;
          margin-bottom: 2rem;
          text-align: center;
        }
        .oauth-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .oauth-group {
          display: flex;
          gap: 1rem;
        }
        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex: 1;
        }
        .oauth-btn img {
          margin-right: 0.5rem;
        }
        .google { background-color: #DB4437; color: white; }
        .linkedin { background-color: #0077B5; color: white; }
        .github { background-color: #333; color: white; }
        .oauth-btn:hover { opacity: 0.9; }
        .divider {
          text-align: center;
          margin: 2rem 0;
          color: #666;
        }
        .divider::before,
        .divider::after {
          content: "";
          display: inline-block;
          width: 40%;
          border-top: 1px solid #ddd;
          vertical-align: middle;
          margin: 0 0.5rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-group label {
          margin-bottom: 0.5rem;
          color: #333;
        }
        .input-group input {
          padding: 0.55rem;
          
          border-radius: 5px;
          font-size: 1rem;
          outline: none;
        }
        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
        }
        .submit-btn {
          background-color: #4a90e2;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #3a7bc8;
        }
        .signup-text {
          text-align: center;
          margin-top: 1rem;
          color: #666;
        }
        .signup-text a {
          color: #4a90e2;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .login-left, .login-right {
            flex: none;
            width: 100%;
          }
          .login-left {
            height: 40vh;
          }
          .login-right {
            height: 60vh;
          }
        }
      `}</style>
    </div>
  )
}

