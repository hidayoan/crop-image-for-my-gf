import './App.css'
import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import demo from './demo.png'
import 'antd/dist/reset.css';
import { Button, ColorPicker, Slider, Row, Col, InputNumber, Switch, Upload } from 'antd';

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
    setColor(e.toHexString())
  }


  return (
    <div className="App">
      <h1>
        {/* peach and watermelon */}
        🍑 & 🍉
      </h1>

      <div className="content">
        <div className='group-all' style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }} >
            <div className="group-child">
              <h3>Em chọn hình từ máy tính nhen</h3>
              <div className="group">
                <Upload
                  onChange={({ file }) => {
                    setImage(file)
                  }}
                  beforeUpload={() => false}
                  showUploadList={false}
                  accept='image/*'
                >
                  <Button className="upload-button" type='primary'>Chọn hình</Button>
                </Upload>
              </div>
            </div>
            <div className="group-child">
              <h3>Em đổi size hình ở đây nè</h3>
              <div className='group'>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={0}
                      max={300}
                      onChange={(e) => setHeight(e)}
                      value={typeof height === 'number' ? height : 0}
                      className="slider"
                      trackStyle={{ backgroundColor: '#bb86fc' }}
                    />
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      min={0}
                      max={300}
                      style={{ margin: '0 16px' }}
                      value={height}
                      onChange={(e) => setHeight(e)}
                      bordered={false}
                      className="input-number"
                      controls={false}
                    />
                  </Col>
                </Row>
                {/* reset button */}
                <Button onClick={() => setHeight(200)} danger type='primary'>Reset</Button>
              </div>
            </div>

            <div className="group-child">
              <h3>Em xoay hình ở đây nè</h3>
              <div className='group'>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={0}
                      max={360}
                      onChange={(e) => setRotate(e)}
                      value={typeof rotate === 'number' ? rotate : 0}
                      className="slider"
                      trackStyle={{ backgroundColor: '#bb86fc' }}
                    /></Col>
                  <Col span={12}>
                    <InputNumber
                      min={0}
                      max={300}
                      style={{ margin: '0 16px' }}
                      value={rotate}
                      onChange={(e) => setRotate(e)}
                      bordered={false}
                      className="input-number"
                      controls={false}
                    />
                  </Col>
                </Row>
                {/* reset button */}
                <Button onClick={() => setRotate(0)} danger type='primary'>Reset</Button>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }} >
            <div className="group-child">
              <h3>Em đổi màu hình ở đây nè</h3>
              <div className='group'>
                <ColorPicker value={color} onChange={handleChangeColor} />
                <Button onClick={() => setColor('#ffffff')} danger type='primary'>Reset</Button>
              </div>
            </div>
            <div className="group-child">

              <h3>Em lật hình ở đây nè</h3>
              <div className="group-switch">
                <Switch checked={flip} onChange={(e) => setFlip(e)} />
              </div>
            </div>
          </div>
        </div>

        <div className="image" ref={printRef} style={{ backgroundColor: color }}>
          {image ? <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="preview" style={{ height: height + 'px', transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}` }} />
            : <p>Chọn hình xong nó hiện dô đây</p>
          }
        </div>
      </div>

      <h3>Chỉnh vừa mắt xong nhấn dô đây lưu hình lại</h3>
      <Button onClick={handleDownloadElementToImage} type='primary' size='large' style={{background: '#bb86fc'}}>Lưu hình</Button>
    </div>
  );
}

export default App;
