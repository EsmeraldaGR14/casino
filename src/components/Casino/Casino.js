import React, { useState } from "react";
import "./Casino.css";
import axios from "axios";

function Casino() {
  const apiUrl = process.env.REACT_APP_API_URL;
  //   console.log(apiUrl);

  const [deckId] = useState("1ayzu9bfo9wx");
  const [remaining, setRemaining] = useState(0);
  const [drawnCards, setDrawnCards] = useState([]);

  //   const [pointsPlayerOne, setPointsPlayerOne] = useState(0);
  //   const [pointsPlayerTwo, setPointsPlayerTwo] = useState(0);
  //
  /*
  //   const [drawnCard, setDrawnCard] = useState(null);
  //   console.log(deckId);

  //   useEffect(() => {
  //     async function fetchApiNewDeck() {
  //       try {
  //         const response = await axios.get(
  //           `${apiUrl}/api/deck/new/shuffle/?deck_count=1`
  //         );
  //         const data = response.data;
  //         console.log(data);
  //         setDeckId(data.deck_id);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }

  //     fetchApiNewDeck();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   useEffect(() => {

  //     fetchApiDrawCard();
  //   }, []);

  //   when the deck only has 4 remaining cards then it should send one to each player and two to the table

  // i also want a little bubble that keeps count of how many sweeps ive made

  // async function fetchApiListingCardPile() {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/deck/${deckId}/list/ `);
  //     const data = response.data;
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  */

  async function fetchApiDrawCard() {
    try {
      if (remaining > 4) {
        const responseOne = await axios.get(
          `${apiUrl}/api/deck/${deckId}/draw/?count=12`
        );
        const data = responseOne.data;
        console.log(data);

        setRemaining(data.remaining);
        setDrawnCards([
          [data.cards.slice(0, 4)],
          [data.cards.slice(4, 8)],
          [data.cards.slice(8, 12)],
        ]);
      }
      if (remaining === 4) {
        const response = await axios.get(
          `${apiUrl}/api/deck/${deckId}/draw/?count=4`
        );
        const data = response.data;
        console.log(data);

        setRemaining(data.remaining);
        setDrawnCards([
          [data.cards[0]],
          [data.cards[1], data.cards[2]],
          [data.cards[3]],
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(remaining);
  console.log(drawnCards);

  async function fetchApiShuffleDeck() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/deck/${deckId}/shuffle/?remaining=true`
      );

      const data = response.data;

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchApiResetDeck() {
    try {
      const response = await axios.get(`${apiUrl}/api/deck/${deckId}/return/`);
      const data = response.data;
      setRemaining(data.remaining);
    } catch (e) {
      console.log(e);
    }
  }

  //   function handlePlayerOnePile() {}

  //   function handlePlayerTwoPile() {}

  function handleShuffle() {
    fetchApiShuffleDeck();
    // fetchApiListingCardPile();
  }

  function handleDraw() {
    fetchApiDrawCard();
  }

  function handleReset() {
    fetchApiResetDeck();
  }

  return (
    <div className="casino-container">
      <div className="piles-and-count">
        <div>
          <div>Players Pile One</div>
          <div>Count</div>
        </div>
        <div>
          <div>Count</div>
          <div>Players Pile Two</div>
        </div>
      </div>

      {remaining === 4 && (
        <>
          <div className="table-pile">
            <div className="table-item">
              <div className="card-row">
                {drawnCards[0] &&
                  drawnCards[0].map(({ code, image, suit, value }, index) => (
                    <div key={`${code}-${index}`} className="card-container">
                      <div>{code}</div>
                      <img src={image} height="100px" alt={code} />
                    </div>
                  ))}
              </div>
            </div>

            <div className="table-item">
              {drawnCards[1] &&
                drawnCards[1].map(({ code, image, suit, value }, index) => (
                  <div key={`${code}-${index}`} className="card-container">
                    <div>{code}</div>
                    <img src={image} height="100px" alt={code} />
                  </div>
                ))}
            </div>

            <div className="table-item">
              <div className="card-row">
                {drawnCards[2] &&
                  drawnCards[2].map(({ code, image, suit, value }, index) => (
                    <div key={`${code}-${index}`} className="card-container">
                      <div>{code}</div>
                      <img src={image} height="100px" alt={code} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

      {remaining > 4 && (
        <>
          <div className="table-pile">
            <div className="table-item">
              <div className="card-row">
                {drawnCards[0] &&
                  drawnCards[0][0].map(
                    ({ code, image, suit, value }, index) => (
                      <div key={`${code}-${index}`} className="card-container">
                        <div>{code}</div>
                        <img src={image} height="100px" alt={(suit, value)} />
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="table-item">
              <div className="table">
                <div className="card-container">
                  {drawnCards[1] && (
                    <>
                      <div>{drawnCards[1][0][2].code}</div>
                      <img
                        src={drawnCards[1][0][2].image}
                        height="100px"
                        alt={drawnCards[1][0][2].code}
                      />
                    </>
                  )}
                </div>
                <div className="card-row">
                  <div className="card-container">
                    {drawnCards[1] && (
                      <>
                        <div>{drawnCards[1][0][0].code}</div>
                        <img
                          src={drawnCards[1][0][0].image}
                          height="100px"
                          alt={drawnCards[1][0][0].code}
                        />
                      </>
                    )}
                  </div>
                  <div className="card-container">
                    {drawnCards[1] && (
                      <>
                        <div>{drawnCards[1][0][1].code}</div>
                        <img
                          src={drawnCards[1][0][1].image}
                          height="100px"
                          alt={drawnCards[1][0][1].code}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="card-container">
                  {drawnCards[1] && (
                    <>
                      <div>{drawnCards[1][0][3].code}</div>
                      <img
                        src={drawnCards[1][0][3].image}
                        height="100px"
                        alt={drawnCards[1][0][3].code}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="table-item">
              <div className="card-row">
                {drawnCards[2] &&
                  drawnCards[2][0].map(
                    ({ code, image, suit, value }, index) => (
                      <div key={`${code}-${index}`} className="card-container">
                        <div>{code}</div>
                        <img src={image} height="100px" alt={(suit, value)} />
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="deck">
        <div className="deck-row">
          <div>Deck Pile</div>
          <button onClick={handleShuffle}>Shuffle</button>
        </div>
        <div className="deck-row">
          <button onClick={handleDraw}>Draw</button>
        </div>
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Casino;
