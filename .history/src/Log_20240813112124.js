function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/special-diet" element={<SpecialDiet />} />
          <Route path="/login" element={<Log />} />
          <Route path="/signup" element={<Sign />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;