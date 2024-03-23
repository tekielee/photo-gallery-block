function ImageShow( {image} ) {
    return (
        <div key={image.id}>
            <img src={image.urls.small} alt={image.alt_description} />
        </div>
    );
}

export default ImageShow;