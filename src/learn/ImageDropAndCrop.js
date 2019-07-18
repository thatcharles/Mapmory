import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
//import 'react-image-crop/dist/ReactCrop.css';
import '../thirdParty/DragAndCrop.css';

import {base64StringtoFile,image64toCanvasRef, extractImageFileExtensionFromBase64,downloadBase64File} from './ResuableUtils'

const maxImgSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

class ImageDropAndCrop extends Component {

	constructor(props){
		super(props)
		this.imagePreviewCanvas = React.createRef()
		this.fileInputRef = React.createRef()
		this.state = {
			imgSrc: null,
			crop: {
				aspect: 1 / 1
			},
			fileExt: null
		}
	}

	verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > maxImgSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

	handleOnDrop = (files, rejectedFiles) => {
		// console.log(files)
		if (rejectedFiles && rejectedFiles.length > 0){
			console.log(rejectedFiles)
			this.verifyFile(rejectedFiles)
			}

		const isVerified = this.verifyFile(files)
		if (isVerified) {
			const currentFile = files[0]
			// to imageBase64Data
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				console.log(reader.result)
				const ImageResult = reader.result
				// set state here
				this.setState({
					imgSrc: ImageResult,
					fileExt: extractImageFileExtensionFromBase64(ImageResult)
				})
			}, false)

			reader.readAsDataURL(currentFile) // trigger eventListener, sent data to eventListerner
		}
	}

	handleImageLoaded = (image) => {
		// console.log(image)
		this.setState({
			image: image
		})
	}

	handleOnCropChange = (crop) => {
		this.setState({crop: crop})
	}



	handleOnCropComplete = (crop, pixelCrop) => {
		const canvasRef = this.imagePreviewCanvas.current
		const {imgSrc} = this.state

		// fit canvas(canvasRef) into thesize of our cropped area(pixelCrop) and display the cropped area(image64)
		// if the image is too big, the dispaly of image crop would be broken
		image64toCanvasRef(canvasRef,imgSrc,crop)
	}

	handleDownloadClick = (event) => {
		event.preventDefault()
		const {imgSrc} = this.state
		if (imgSrc) {
			const canvasRef = this.imagePreviewCanvas.current
		
			const {fileExt} = this.state
			const imageData64 = canvasRef.toDataURL('image/' + fileExt)

			// Name new file
			const fileName = 'croppedImage.' + fileExt

			// Create new file
			const myNewCroppedFile = base64StringtoFile(imageData64, fileName)

			// Download file
			downloadBase64File(imageData64,fileName)
			this.handleClearToDefault()
		}

	}

	handleClearToDefault = (event) => {
		this.setState({
			imgSrc: null,
			fileExt: null
		})
		const fileInputRef = this.fileInputRef.current
		fileInputRef.value = null
		const canvas = this.imagePreviewCanvas.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0,0,canvas.width,canvas.height)
	}

	handleFileSelect = (event) => {
		console.log(event)
		const files = event.target.files
		if (files && files.length > 0){
			const isVerified = this.verifyFile(files)
			if (isVerified) {
				const currentFile = files[0]
				// to imageBase64Data
				const reader = new FileReader()
				reader.addEventListener("load", () => {
					console.log(reader.result)
					const ImageResult = reader.result
					// set state here
					this.setState({
						imgSrc: ImageResult,
						fileExt: extractImageFileExtensionFromBase64(ImageResult)
					})
				}, false)

				reader.readAsDataURL(currentFile) // trigger eventListener, sent data to eventListerner
			}
		}
	}

	render () {
		const {imgSrc} = this.state 
		return (
		  <div>
		    <h1>Drop And Crop</h1>
		    <input ref={this.fileInputRef} type='file' accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect}/>
		    {imgSrc !== null?
		    	<div>
		    		<ReactCrop 
		    			src={imgSrc} 
		    			crop={this.state.crop} 
		    			onChange={this.handleOnCropChange} 
		    			onComplete={this.handleOnCropComplete} 
		    			onImageLoaded={this.handleImageLoaded}
		    		/>
		    		<br/>
		    		<p>Preview Canvas</p>
		    		<canvas ref={this.imagePreviewCanvas}></canvas>
		    		<button onClick={this.handleDownloadClick}>Download</button>
		    	</div>
		    : 
			    <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} maxSize={maxImgSize}>
			    { ({getRootProps, getInputProps}) => (
			    	<section>
			    		<div {...getRootProps()}>
		        		<input {...getInputProps()} />
		        		<p>Drag 'n' drop some files here, or click to select files</p>
		      			</div>
			    	</section>
			    )}
			    </Dropzone>
			}
		  </div>
		)
		}
}

export default ImageDropAndCrop
