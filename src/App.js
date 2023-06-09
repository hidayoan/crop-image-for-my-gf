import './App.css'
import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import demo from './demo.png'
import { ChromePicker } from 'react-color';

function App() {
  let [image, setImage] = useState(demo)
  let [height, setHeight] = useState(200)
  let [rotate, setRotate] = useState(0)
  let [flip, setFlip] = useState(false)
  let [color, setColor] = useState('#ffffff')

  const printRef = React.useRef();

  const handleDownloadElementToImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  const handleChangeColor = (e) => {
    setColor(e.target.value)
  }


  return (
    <div className="App">
      <h1>
        {/* peach and watermelon */}
        🍑 & 🍉
      </h1>

      <h3>Em chọn hình từ máy tính nhen</h3>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="upload-button" accept='image/*' />

      <div className='group' style={{ marginBottom: '40px' }}>
        <div className="group-child">
          <h3>Em đổi size hình ở đây nè</h3>
          <div className='group'>
            <input type="range" min="0" max="300" value={height} onChange={(e) => setHeight(e.target.value)} className="slider" />
            <span>{height}</span>
            {/* reset button */}
            <button onClick={() => setHeight(200)} className="reset-button">Reset</button>
          </div>
        </div>

        <div className="group-child">
          <h3>Em xoay hình ở đây nè</h3>
          <div className='group'>
            <input type="range" min="0" max="360" value={rotate} onChange={(e) => setRotate(e.target.value)} className="slider" />
            <span>{rotate}</span>
            {/* reset button */}
            <button onClick={() => setRotate(0)} className="reset-button">Reset</button>
          </div>
        </div>

        <div className="group-child">
          <h3>Em đổi màu hình ở đây nè</h3>
          <div className='group'>
            <ChromePicker color={color} onChangeComplete={handleChangeColor} />
            {/* reset button */}
          </div>
          <button className="reset-button" style={{marginTop: 20}} onClick={() => setColor('#ffffff')}>Reset</button>
        </div>
      </div>

      <div className="group" style={{ marginBottom: '40px' }}>
        <h3 style={{ marginRight: '20px' }}>Em lật hình ở đây nè</h3>
        <div className="toggle-switch">
          <input
            type="checkbox"
            className="toggle-switch-checkbox"
            name="toggleSwitch"
            id="toggleSwitch"
            checked={flip} onChange={(e) => setFlip(e.target.checked)}
          />
          <label className="toggle-switch-label" htmlFor="toggleSwitch">
            <span className="toggle-switch-inner" />
            <span className="toggle-switch-switch" />
          </label>
        </div>
      </div>

      <div className="image" ref={printRef} style={{ backgroundColor: color }}>
        {image ? <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="preview" style={{ height: height + 'px', transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}` }} />
          : <p>Chọn hình xong nó hiện dô đây</p>
        }
      </div>

      <h3>Chỉnh vừa mắt xong nhấn dô đây lưu hình lại</h3>
      <button className="save-button" onClick={handleDownloadElementToImage}>Lưu hình</button>
    </div>
  );
}

export default App;
