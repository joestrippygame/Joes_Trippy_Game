/**
 * Joe's Trippy Adventure — terminal edition
 *
 * Modern TypeScript adaptation of the original Ruby/Sinatra game,
 * followed by the improvised Mr. Pickles storyline created in chat.
 *
 * Node 24: node joe-trippy-adventure.ts
 * Node 22: node --experimental-strip-types joe-trippy-adventure.ts
 *
 * Original-source branches and unfinished routes are identified in-game.
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

type Choice<T extends string> = { label: string; value: T };

class Adventure {
  readonly #io = createInterface({ input: stdin, output: stdout });
  #name = "Joe";

  close(): void {
    this.#io.close();
  }

  #say(message = ""): void {
    stdout.write(`${message}\n`);
  }

  #title(message: string): void {
    this.#say();
    this.#say("╔" + "═".repeat(66) + "╗");
    this.#say(`║ ${message.toUpperCase().padEnd(64)} ║`);
    this.#say("╚" + "═".repeat(66) + "╝");
    this.#say();
  }

  async #ask(prompt: string): Promise<string> {
    return (await this.#io.question(prompt)).trim();
  }

  async #pause(): Promise<void> {
    await this.#ask("\n[Press Enter to continue]");
  }

  async #choose<T extends string>(prompt: string, choices: readonly Choice<T>[]): Promise<T> {
    this.#say();
    this.#say(prompt);
    choices.forEach((choice, index) => this.#say(`  ${index + 1}. ${choice.label}`));

    while (true) {
      const selected = Number(await this.#ask("> "));
      if (Number.isInteger(selected) && selected >= 1 && selected <= choices.length) {
        return choices[selected - 1]!.value;
      }
      this.#say(`Enter a number from 1 to ${choices.length}.`);
    }
  }

  async run(): Promise<void> {
    while (true) {
      this.#title("Joe's Trippy Adventure");
      this.#say("Welcome to Joe's Games.");
      this.#say("A knock at the door. A night out with Dave. A walk in the woods.");
      this.#name = (await this.#ask("What's your name? ")) || "Joe";
      const age = Number(await this.#ask("How old are you? "));

      if (!Number.isInteger(age) || age < 18) {
        this.#say("This adventure is intended for adults 18 and over.");
        return;
      }

      this.#say(`Great, ${this.#name}. You're old enough to play Joe's Trippy Adventure Game.`);
      await this.#pause();

      const result = await this.#originalAdventure();
      if (result === "quit") return;
      if (result === "restart") continue;

      const again = await this.#choose("Play again?", [
        { label: "Start a new adventure", value: "yes" },
        { label: "Quit", value: "no" },
      ] as const);
      if (again === "no") return;
    }
  }

  async #originalAdventure(): Promise<"continue" | "restart" | "quit"> {
    this.#title("Chapter 1 — A Knock at the Door");
    this.#say(`One day, ${this.#name} is sitting at home when someone knocks at the door.`);
    this.#say("*KNOCK KNOCK KNOCK*");
    const answer = await this.#choose("Do you get up and answer it?", [
      { label: "Yes, answer the door.", value: "yes" },
      { label: "No, ignore it.", value: "no" },
    ] as const);

    // Faithful to Ruby: rand(1..8); 1–5 Dave, 7–8 police. Roll 6 has no branch.
    let roll: number;
    do {
      roll = Math.floor(Math.random() * 8) + 1;
      this.#say(`[The original game's door roll: ${roll}]`);
      if (roll === 6) {
        this.#say("SOURCE QUIRK: the Ruby route has no outcome for a roll of 6. The knock comes again.");
      }
    } while (roll === 6);

    if (roll > 6) {
      this.#title("The Cops at the Door");
      this.#say(`"Fuck, ${this.#name}! It's the cops!" They come inside and spot the bong on the table.`);
      this.#say(`"Well damn, ${this.#name}. They arrest you and take you to jail."`);
      return await this.#choose("What now?", [
        { label: "Play again", value: "restart" },
        { label: "Quit", value: "quit" },
      ] as const);
    }

    this.#say(answer === "yes"
      ? `You're in luck, ${this.#name}. It's your good buddy Dave.`
      : `It doesn't matter, ${this.#name}; your good buddy Dave walks in on his own.`);
    this.#say(`Dave: "What's up, ${this.#name}? I'm thinking about hitting the club. Wanna go?"`);

    const hangOut = await this.#choose("Do you hang out at home before leaving?", [
      { label: "Yes, hang out and watch TV first.", value: "yes" },
      { label: "No, head out now.", value: "no" },
    ] as const);

    if (hangOut === "yes") {
      this.#say(`${this.#name} and Dave hang out and watch a little TV.`);
      this.#say('After a while, Dave says, "Come on, man. Let\'s head to the club."');
    } else {
      this.#say(`${this.#name} and Dave get ready and leave for the club.`);
    }

    this.#say("You pull up near the club. Music thumps from inside, and a wooded path runs along the parking lot.");
    const destination = await this.#choose("Do you go inside or take a walk in the nearby woods?", [
      { label: "Go into the club.", value: "club" },
      { label: "Take a walk in the woods.", value: "woods" },
    ] as const);

    if (destination === "club") {
      this.#say("You arrive at the club, ready for a night out. You and Dave sit at the bar.");
      this.#say("The original Ruby project has a separate drinking, shots, beer, and pool storyline.");
      const leave = await this.#choose("What next?", [
        { label: "Head out for a walk in the woods.", value: "woods" },
        { label: "End the adventure at the club.", value: "end" },
      ] as const);
      if (leave === "end") return "quit";
    }

    this.#title("Chapter 2 — The Woods");
    this.#say("You and Dave head down the path. Before long, the trees grow thicker and the club lights disappear.");
    this.#say('Dave: "Damn, man. I think we might be lost."');
    const path = await this.#choose("What do you do?", [
      { label: "Continue down the path.", value: "continue" },
      { label: "Turn around.", value: "turn" },
    ] as const);

    if (path === "continue") {
      this.#say('You get a little farther when Dave says, "Hey, man, I think we are lost."');
      this.#say(`You: "Yeah, I just said that. Who cares? We're out here enjoying nature, aren't we?"`);
    } else {
      this.#say("You turn around, hoping not to get too lost. The trees seem to shift around you.");
      this.#say("Before long, you realize you're completely lost.");
    }

    const walk = await this.#choose("What do you do now?", [
      { label: "Sit down and take a break.", value: "sit" },
      { label: "Keep walking.", value: "walk" },
    ] as const);

    if (walk === "walk") {
      this.#say("SOURCE NOTE: the original Ruby route sends this choice to an unfinished error page.");
      const fallback = await this.#choose("The walking branch is unfinished. How should we proceed?", [
        { label: "Stop and take a breather with Dave.", value: "sit" },
        { label: "End this run.", value: "end" },
      ] as const);
      if (fallback === "end") return "quit";
    }

    this.#title("Chapter 3 — Something in the Trees");
    this.#say("You and Dave sit down. The woods grow strangely quiet.");
    this.#say(`You: "Dave, I think something is watching us. Can you feel it?"`);
    this.#say(`Dave: "WTF! Look, ${this.#name}! LOOK! Are you seeing this too?"`);
    const see = await this.#choose("What do you say?", [
      { label: '"Yeah, WTF is it?"', value: "yes" },
      { label: '"No, what are you talking about?"', value: "no" },
    ] as const);
    this.#say(see === "yes"
      ? '"Are you seeing little creepy-looking creatures or whatever they are?"'
      : "Dave points to the edge of the clearing. Something small moves behind a tree.");
    this.#say('"Yeah, man. What the hell are they?"');
    this.#say('"Let\'s go check them out."');
    await this.#pause();
    this.#say("You get up to investigate. Whatever you saw goes scampering off.");
    return "continue";
  }

  async #improvisedStory(): Promise<void> {
    this.#title("Chapter 4 — The Things That Shouldn't Be in the Woods");
    this.#say("IMPROVISED CONTINUATION — these events were created in chat, not found in the original Ruby source.");
    this.#say("You and Dave charge after the creatures.");
    this.#say('Dave: "HEY! SLOW DOWN! I GOT SHORT LEGS!"');
    this.#say(`You: "Dave, you're six foot two!"`);
    this.#say('Dave: "Yeah, but I\'m six foot two and TERRIFIED!"');
    this.#say("Seven tiny creatures stop and turn around. They're wearing business suits.");
    this.#say('The smallest steps forward: "Joseph McKenzie. We\'ve been expecting you."');
    this.#say('Dave: "I think the one with the briefcase is our lawyer."');
    this.#say('The creature bows. "Mr. Pickles. Senior Director of Interdimensional Affairs. Department 7B."');
    this.#say("A door appears in an ancient oak: THE DEPARTMENT OF LOST REALITIES.");
    this.#say('Mr. Pickles: "The universe is experiencing a paperwork error."');
    this.#say('Dave: "WHAT THE HELL DOES THAT EVEN MEAN?"');
    this.#say('Mr. Pickles: "It means your Tuesday has been cancelled."');
    await this.#pause();

    this.#title("Chapter 5 — The Interrogation");
    this.#say('You demand answers. Mr. Pickles adjusts his tiny sunglasses.');
    this.#say('"Your reality has been leaking. Someone has been stealing minutes from the future."');
    this.#say('Then he adds: "Dave has been dead for approximately 47 years."');
    this.#say('Dave: "JOE! DON\'T LISTEN TO THIS LITTLE SHIT!"');
    this.#say("Dave's shadow starts waving, even though Dave isn't moving.");
    await this.#pause();

    this.#title("Chapter 6 — The Briefcase of Bad Decisions");
    this.#say("You grab Mr. Pickles' briefcase.");
    this.#say('Mr. Pickles: "NO! THAT IS GOVERNMENT PROPERTY!"');
    this.#say('You: "Yeah? Well, I\'m the government now."');
    this.#say("CLICK. A chicken in a police uniform jumps out.");
    this.#say('Chicken: "CLUCK! EVERYBODY FREEZE!"');
    this.#say('Dave: "I KNEW IT! THE CHICKENS ARE ORGANIZED!"');
    this.#say("Inside: a glowing red phone, a bottle labeled MEMORIES YOU FORGOT, a moving map, and a photo of you and Dave dated November 23, 2096.");
    this.#say('The phone rings. A voice says: "Hello, Joseph. This is you. From tomorrow."');
    await this.#pause();

    this.#title("Chapter 7 — The Memories You Forgot");
    this.#say("You drink the memory bottle. It tastes like blueberry pancakes, old pennies, and your grandmother's living room.");
    this.#say("The forest vanishes. You're in a white room. Dave stands beside you in a tuxedo, holding a birthday cake.");
    this.#say('Dave: "Happy birthday, Joe."');
    this.#say('You: "It\'s not my birthday."');
    this.#say('Dave: "Not yours. Mine."');
    this.#say('A recording crackles: "When the seventh bell rings, the one who remembers must choose."');
    this.#say("Dave's hands turn transparent. "Joe... I wasn't supposed to come back with you."");
    await this.#pause();

    this.#title("Chapter 8 — Nobody Gets Left Behind");
    this.#say("You grab Dave by the wrist. A golden rope shoots from the key in your pocket.");
    this.#say('Mr. Pickles: "You are retrieving someone whose existence has been administratively discontinued!"');
    this.#say('You: "THEN GET ME A SUPERVISOR!"');
    this.#say("Dave's shadow becomes a second Dave. Same face. Silver eyes.");
    this.#say('Shadow Dave: "Joe. Let him go."');
    this.#say('Dave: "Don\'t listen to that creepy son of a bitch!"');
    await this.#pause();

    this.#title("Chapter 9 — The Truth About Dave");
    this.#say('You demand: "Which Dave is real?"');
    this.#say('Mr. Pickles: "Neither of them is entirely real. The Dave you know is a memory. The other is what happens when a memory refuses to stay buried."');
    this.#say("The original Dave made a deal with the Red Coat. One Dave left. The other guarded the door.");
    this.#say("DONG. The third bell rings. The two Daves merge into a glowing silhouette.");
    this.#say('The silhouette: "JOE. YOU HAVE TO REMEMBER WHAT YOU DID. YOU WERE THERE TOO."');
    this.#say("A figure in a red coat steps from behind the tree. It has your face.");
    await this.#pause();

    this.#title("Chapter 10 — The Red-Coated Joe");
    const choice = await this.#choose("What does Joe do?", [
      { label: "Confront the red-coated version of myself.", value: "confront" },
      { label: "Demand that Mr. Pickles explain what I did.", value: "pickles" },
      { label: "Tell Dave I trust him, no matter what.", value: "dave" },
      { label: "Grab the golden key and ring the fourth bell.", value: "bell" },
    ] as const);

    if (choice === "confront") this.#say('Red Joe smiles: "I\'m the version of you who remembers how this started."');
    if (choice === "pickles") this.#say('Mr. Pickles whispers: "You opened the first door, Joseph. You always do."');
    if (choice === "dave") this.#say("Both Daves fall silent. For the first time, neither one looks afraid.");
    if (choice === "bell") this.#say('Mr. Pickles screams: "DON\'T RING THAT ONE! IT\'S THE RETURN BELL!"');

    this.#say("The red-coated Joe raises one hand. Every tree in the forest stops moving.");
    this.#say("The red telephone begins ringing inside the briefcase.");
    this.#say("TO BE CONTINUED...");
  }
}

const game = new Adventure();
try {
  await game.run();
} finally {
  game.close();
}
