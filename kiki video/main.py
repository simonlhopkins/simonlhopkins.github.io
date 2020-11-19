
import moviepy

from moviepy.editor import VideoFileClip, concatenate_videoclips, AudioFileClip, CompositeAudioClip

startTime =34
intro = VideoFileClip("kikipt1.mp4")
silentKiki = VideoFileClip("kikipt2.mp4")
audio_background = AudioFileClip('Attack Attack! - Stick Stickly (Official Music Video).mp3')
trimmedAudio = audio_background.subclip(startTime, startTime + silentKiki.duration)
final_audio = CompositeAudioClip([silentKiki.audio, trimmedAudio])
final_clip = silentKiki.set_audio(final_audio)
returnClip = concatenate_videoclips([intro, final_clip])
returnClip.write_videofile("final.mp4")
