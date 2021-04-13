import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Header,
  HeaderContent,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";

function validURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [shrinkedUrl, setShrinkedUrl] = useState("");
  const axios = require("axios");

  const shrinkUrl = async () => {
    setLoading(true);
    let urlToShrink = document.querySelector("#url-to-shrink").value;
    if (!validURL(urlToShrink)) {
      setLoading(false);
      return alert("Invalid URL.");
    }
    axios
      .post("./api/shrink", {
        url: urlToShrink,
      })
      .then((res) => {
        setShrinkedUrl(window.location.href + res.data.hash);
        console.log(res.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Alamis URL Shortener'
    document.querySelector("#url-to-shrink").onkeydown = (e) => {
      if (e.keyCode === 13) {
        shrinkUrl();
      }
    };
  }, []);

  return (
    <Container textAlign="center">
      <Segment padded basic>
        <Header as="h2" icon color="pink" size="huge">
          <Icon name="user secret" />
          URL Shortener
        </Header>
        <br></br>
        <Input
          loading={loading}
          id="url-to-shrink"
          icon={{
            name: "search",
            circular: true,
            link: true,
            onClick: shrinkUrl,
          }}
          placeholder="https://example.com"
        />
      </Segment>
      {!loading && shrinkedUrl !== "" ? (
        <Card centered>
          <Card.Content>
            <Card.Header>
              <Icon name="globe" /> Shrinked URL
            </Card.Header>
            <Card.Description>
              <a href={shrinkedUrl}>{shrinkedUrl}</a>
            </Card.Description>
          </Card.Content>
        </Card>
      ) : (
        ""
      )}
    </Container>
  );
}
