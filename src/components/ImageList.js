import './ImageList.css';
import ImageShow from './ImageShow';

function ImageList( { images } ) {
    const renderedImages = images.map( (image) => {
        return (
            <ImageShow key={image.id} image={image} />        )
    });

	return (
        <div className="image-lists">{renderedImages}</div>
	);
}

export default ImageList;