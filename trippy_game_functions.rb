require_relative "sound_functions.rb"
game_sounds

#I want some kind of Psychedelic music playing in Background on a lower setting nothing to intrusive though 
# why wont it recognize my name inside of the module ?



def player_name
	puts "Hey man whats your name?"
	@your_name = $stdin.gets.chomp.upcase
	play_game
end

#an array that i can call the message with the index position and %<anything>s is the key value that will be replaced
#by what the user inputs. 
MESSAGES = [
  "That was an incorrect Choice %<your_name>s... Try again man.",
  "Man you messed up %<your_name>s Try again.",
  "Hey man you screwed up..... Try again %<your_name>s.",
  "Wow you suck at picking choices %<your_name>s that wasn't valid, Try Again man."
]

def play_game
	knock_at_door
	anyone_home
	prompt = ">"
	puts "\n#{@your_name} is sitting around at home watching some TV and smoking on a bong when someone knocks at the door
Do you get up and answer it?"
cough_3x
	print prompt
	while @answer_door = gets.chomp.upcase
	case @answer_door
	#try n do a when starts with type of thing
	when  /Y/
		answer_door_man
		break
	when /N/
		answer_door_man
		break
	else
	puts MESSAGES[0] % { your_name: @your_name }
	print prompt
	end
  end
end



def answer_door_man
	door = rand(2).floor
	if @answer_door.include?('Y') && door == 0
	door_open
		puts "\n #{@your_name} answers the door and its your good buddy Dave. Dave asks you if you wanna go out and get 
a few drinks and maybe do a lil something special ..."
	chill_with_dave
	elsif @answer_door.include?('Y') && door == 1
	police_siren
		puts "\n Oh no its the cops and they see the bong that you left out in the open and take you to jail... Damn"
	gameover
		puts ("\nWell that sucks.... Lets Play again.")
			player_name
	elsif @answer_door.include?('N') and door == 0
	door_open
		puts"\n You don't bother getting up to answer the door #{@your_name} but that don't matter because in walk Dave says WTF 
why didn't you answer dick? \nI knew you were in here....Well you wanna go get some drinks and I got a lil something special for us too man ."
		chill_with_dave
	elsif @answer_door.include?('N') and door == 1
	knock_at_door
	snoring
		puts "\n #{@your_name} doesn't answer the door even though they knocked again and just smokes out and falls asleep watching TV. 
Since #{@your_name} fell asleep and missed all the fun The game is over Lets try again and maybe you can get farther...."
	gameover
	player_name	
  else puts MESSAGES[2] % { your_name: "#{@your_name}" }
	answer_door_man
  end
end


def chill_with_dave
	prompt = ">"
	puts "#{@your_name} tells Dave Uh Hell yeah I do....You even gotta ask? I'm always down for whatever. 
Do you Leave right away or smoke some bud first?"
	print prompt
	while leavenow = $stdin.gets.chomp.upcase 
		case leavenow
		when /L/
			puts "#{@your_name} rolls up a fat blunt and start out for the club."
			go_to_club 
			break
		when /S/ 
		puts "#{@your_name} asks Dave if he wants to smoke a blunt, to which he replies Uhm yeah....Does a bear shit in the woods?
You guys blaze one up and are chillin when ...... Dave tells you to close your eyes and stick out your tongue.
Do you ?"
	tongue
		break
		else puts MESSAGES[1] % { your_name: "#{@your_name}" }
			print prompt
		end
	end
end



def tongue 
prompt = ">"
print prompt
while tongue = $stdin.gets.chomp.upcase
	case tongue
	when /Y/
		puts "#{@your_name} sticks out thier tongue and upon it Dave places something what you are not quite sure.... You ask Dave what it is and he says OH you will 
find out soon enough."
start_to_trip_at_home
	break

	when /N/
	what_is_it?
		puts "Uh no Why? You ask him and he says Just do it man if you gotta ask me #{@your_name} then u don't want it... 
Will you do it?"
			tongue2
	break
	else puts MESSAGES[0] % { your_name: "#{@your_name}" }	
	print prompt
	end
   end
end



def tongue2
prompt = ">"
print prompt
	while tongue2 = $stdin.gets.chomp.upcase 
		case tongue2
		when /Y/
			puts"#{@your_name} sticks out thier tongue and on it Dave puts a cpl drops of a strange liquid on it....
You look at Dave...Dave Just smiles and laughs ......."
crazy_laugh
		break  
		when /N/ 
			puts"You tell dave not yet man. I know it gotta be something good but I still dont know if im trying to anything tonight.
Dave Says Whatever man your loss...../n You guys smoke a little bud and Head out for the club"
		go_to_club
		break
	else puts MESSAGES[2] % { your_name: "#{@your_name}" }
		
		end
	end
end


def go_to_club
prompt = ">"
	puts "#{@your_name} & Dave arrives at the club and sit down at the bar. Dave orders you guys some drinks.....
/nYou guys get your Dave askes you to stick out your tongue..... Do you?"
		tongue
		puts "Do you hang out at the club or go for a walk?"
print prompt
		while start_to_trip_choice1 = $stdin.gets.chomp.upcase
		case start_to_trip_choice1
		when /H/
		puts "You decide to just chill out at the club for a while enjoy your buzz, and have a few drinks. 
/nYou start jamming out to some good music on the jukebox.....
/nYou guys have a cpl Jagerbombs when you start to feel whatever Dave gave you start to kick in....."
		start_to_trip_at_club
		break
	when /G/
	    puts "You and Dave decide to leave and go for a walk through the woods"
		break
	else puts puts MESSAGES[1] % { your_name: "#{@your_name}" }

end
end
end


def start_to_trip_at_home
	puts "After smoking a couple blunts .... #{@your_name} starts to feel pretty damn good...Whatever crazy ass 
movie you guys are watching is really out there. #{@your_name} and Dave are groovin to craziness that is this movie, 
when #{@your_name} sees something outside .........Do you wanna know what he saw?"
	while seewhat = $stdin.gets.chomp.upcase
	case seewhat
		when /Y/ 
			puts "#{@your_name} says my god did you just see that Dave? To which he replys......... \nWhat? I didnt see anything man I think
you are seeing shit...\n Yeah maybe but wanna go check it out?"
	crazylights
	break
		when /N/ 
			puts "Really you dont want to know what happened? Well ok I guess. I dont think you gonna have much fun on this adventure then."
	break
		else puts MESSAGES[1] % {your_name: "#{@your_name}"}
	end
  end
end

def crazylights

while crazylights = $stdin.gets.chomp.upcase
	case crazylights 
		when /Y/
			puts "Yeah man what the hell.... Lets go check it out.Fuck it lets go for a walk and enjoy this buzz and check out whatever you think you
saw \nAlright cool lets roll." 
		break
		when /N/
			puts "No"
		break	
		else puts MESSAGES[3] % {your_name: "#{@your_name}"}
		end
	end
end



def start_to_trip_at_club
puts "You "


end


def start_walk
	puts "You ask Dave if he wants to go for a walk and enjoy your buzzes out in the real world......... 
	To which Dave Says sure why not........" 


end



