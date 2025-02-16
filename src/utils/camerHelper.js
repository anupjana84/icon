import { launchCamera } from "react-native-image-picker";

 const options={
    launchImageLibrary: {
        mediaType: 'photo',
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
    },
    launchCamera: {
        mediaType: 'photo',
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
    }
}

export const handleImageSelection = () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 0, // Unlimited image selection
    };
  
    launchCamera(options.launchImageLibrary, (response) => {
      if (response.didCancel) {
       // //  console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
      //  //  console.log(response)
        //setImages(response.assets); // Set multiple selected images
      }
    });
  };