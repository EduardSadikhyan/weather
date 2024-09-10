import { BrowserRouter as Router } from "react-router-dom"
import Header from "./features/header/Header"
import WeatherDashboard from "./features/weatherdashboard/WeatherDashboard"

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <WeatherDashboard />
      </div>
    </Router>
  )
}

export default App
