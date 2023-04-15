import { Page, Text, View } from "@react-pdf/renderer";
import { generateDots } from "./protocol-document";
import { styles } from "./styles-protocol";

function Page2() {
  return (
    <Page style={styles.page}>
      <View>
        <Text>
          <Text style={{ fontFamily: "Garamond-Bold" }}>
            Disszertációs előadás
          </Text>{" "}
          címe:
          {"\n"}
        </Text>
        {generateDots(3)}
      </View>
      <View>
        <Text>
          kérdések:
          {"\n"}
        </Text>
        {generateDots(26)}
      </View>
    </Page>
  );
}

export default Page2;
