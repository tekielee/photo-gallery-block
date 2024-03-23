import { useBlockProps } from "@wordpress/block-editor";

export default function save ( { attributes } ) {
    const { unsplashAPIKey } = attributes;

    return (
        <p { ...useBlockProps.save() }>photo gallery block</p>
    );
}