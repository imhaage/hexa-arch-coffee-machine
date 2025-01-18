# Hexa: How To

Examples to illustrate my articles in my newsletter Marevick's Bazaar (https://maeevick.substack.com/t/hexagonalarchitecture)

## Branch dedicated to "Hexagonal Architecture: How To #2": A Simple Case from Scratch

We follow the "official" blueprint from Alistair Cockburn's Hexagonal Architecture Explained.

### Step 0: the Setup https://github.com/Maeevick/hexa-how-to/tree/64c24b785b334e155d58d6ae44bbd8b703d44864

For this first case:

- I will use TypeScript on NodeJS 22
- Some NodeJS flags to strip types and the Native Test Runner

```shell
npm run start
# executes the setup code and displays "Hello TS in NodeJS!" in the console.

npm run test
# executes the setup test and displays the passing test results.
```

### Step 1: Test-to-Test https://github.com/Maeevick/hexa-how-to/tree/faabe3321e0da3b9156c5bd8845e17efca95f97d

- the Application's Business Use Case:

```
As part of our game development, a character can initiate combat against an opponent.

- Combat takes place in turns using random dice rolls.
- A turn consists of two rounds so that the character and opponent each take turns being attacker and defender.
- As soon as one of the fighters drops to 0 hit points, the combat ends.

Consider the following characteristics for the fighters:
- attack: integer > 0
- defense: integer > 0
- hit points: integer > 10

The character always starts as the attacker in the first round, the opponent as defender.

A round corresponds to rolling an X-sided die (X = attack value) vs a Y-sided die (Y = defense value). When the result D is greater than 0 (D = r(X) > r(Y)), then D hit points are subtracted from the defender.
```

According to Alistair Cockburn's terminology, here we have:

- The Test Suite is the **Primary Actor**
- There is no need for a **Primary Adapter** _(at this point)_
- `makeAFightBetweenCharacterAndOpponent.ts` is inside the application and defines the **Primary Port** and the **Secondary Port**.
  - Three dependencies must follow the Secondary Port's contract:
    - ForRetrievingTheCharacter
    - ForPickingTheOpponent
    - ForLaunchingADice
  - Two input/inbound data parameter must follow the Primary Port's contract:
    - characterId
    - opponentId
- The Test Doubles defined in the Test Suite _(which also acts as the Configurator)_ are used as **Secondary Actors** without **Secondary Adapters** _(at this point)_

There is no Configurator for the application expect the Test Suite _(at this point again)_

### Step 2: Real-to-Test https://github.com/Maeevick/hexa-how-to/tree/0a7ee5a1b35c5bf848b5a60758c39a84369729ed

We are switching the Primary Actor from Test Suite to HTTP API (as a Web Server Backend) for this example.

According to Alistair Cockburn's terminology, here we have:

- The HTTP Request through HTTP Server is the **Primary Actor**
- The HTTP Router (to keep the example simple) is the **Primary Adapter**
- The **Primary Port** and the **Secondary Port** stay the same, it's the principle!
- The **Secondary Actors** and the **Secondary Adapters** don't change in this step (still the Test Doubles but extracted from the Test Suite)

Try it:
ttps://github.com/Maeevick/hexa-how-to/tree/faabe3321e0da3b9156c5bd8845e17efca95f97d

```shell
# Health Check
curl http://localhost:3000

> {"hello":"port & adapters"}
```

```shell
# Use case
curl \
-H 'Content-Type: application/json' \
-X POST \
-d '{ "characterId": "char", "opponentId": "opp" }' \
http://localhost:3000/fight

> {"winner":"Chewbacca the Wookie wins"}
```

### Step 3: Test-to-Real https://github.com/Maeevick/hexa-how-to/tree/103327e67308beb119f1afc5bd193dae1870f577

We are switching the Secondary Actor from Test Double to Remote Database for this example.

According to Alistair Cockburn's terminology, in this step we have:

- Back to the Test Suite is the **Primary Actor**
- And there is no need for a **Primary Adapter** _(at this point)_
- The **Primary Port** and the **Secondary Port** stay the same, it's the principle!
- The **Secondary Actors** is the Remote SQL Database (Postgres on Supabase for example)
- The **Secondary Adapters** is our Character Repository that transforme the external world to our application contracts

```
DATABASE_URL="<your_secret>" npm run spec
```

### Step 4: Real-to-Real https://github.com/Maeevick/hexa-how-to/tree/c889c6f7c5d4403ea61adcc42fdf76e376c9691b

We replace the Test Suite with the HTTP Server again. The result is a full Port & Adapters pattern in place 🎉.

```shell
curl \
-H 'Content-Type: application/json' \
-X POST \
-d '{ "characterId": "<the real ID of your character>", "opponentId": "a real ID for an opponent" }' \
http://localhost:3000/fight

> {"winner":"Chewbacca the Wookie wins"}
```

### Last word

Thanks for joining me in this adventure, the newsletter is here : https://maeevick.substack.com
