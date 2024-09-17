import React from "react";

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const allImages = ({ hotelImages }) => {
  const numColumns = 3;
  const containerWidth = Dimensions.get("window").width * 0.8;
  const imageSize = containerWidth / numColumns;
  const router = useRouter();

  const navigateToImage = (image) => {
    router.push(`ui/ImagesView?url=${image.url}`);
  };

  return (
    <View style={styles.container}>
      {hotelImages.map((image) => (
        <TouchableOpacity
          key={image.id}
          onPress={() => navigateToImage(image)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.imageContainer,
              { width: imageSize, height: imageSize },
            ]}
          >
            <Image style={styles.image} source={{ uri: image.url }} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default allImages;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: "auto",
    marginBottom: 70,
  },
  imageContainer: {
    marginBottom: 2,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
