import './App.css'
import ImageSlider from './components/ImageSlider'
import LoadMoreData from './components/LoadMoreData'

function App() {

  return (
    <>
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} limit={5}/> */}

      <LoadMoreData limit={10}/>
    </>
  )
}

export default App
