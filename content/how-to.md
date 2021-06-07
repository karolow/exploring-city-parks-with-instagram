---
title: "How to scrape and study thousands of Instagram posts?"
date: 2018-11-28T15:14:39+10:00
featured: false
draft: false
weight: 2
type: sub-content
---

##### Instagram posts can showcase the city highlights, uncover the aspirations of citizens, and illustrate the variety of their activities in public spaces. While we should not expect it to deliver an accurate picture of reality, Instagram can still be a valuable source of data for city research. See how we explored Bratislava parks using Python and Instagram API[^1].

**>>>>>> This visualisation will allow you to preview the pictures in a tooltip**

{{< svg "static/images/insta/dataviz/test_instagrammable_posts_2020.svg" >}}

### The most instagrammable posts published from Bratislava parks in 2020[^2].

Scrolling through feeds and exploring hashtags can be endless fun for city researchers. But how to speed it up by automating the extraction of thousands of posts for further data mining? For this purpose, we developed a Python package[^3] that simplifies the process of:

1. scraping posts from Instagram API
2. preprocessing and cleaning
3. analysis and visualisation

You may be wondering – what does such a post obtained from Instagram look like? What information does it contain?[^4] How could it be useful to city researchers?

![Horský park](/images/insta/instagram/886870413042639991.jpg)

{{< datawrapper-table id="datawrapper-chart-XoYOS" margin="-15px 0 30px 0" src="https://datawrapper.dwcdn.net/XoYOS/7/" >}}

The Python package made it possible for us to parse tens of thousands of raw Instagram posts into a database and download the corresponding images.

Making sure our tool is working properly, we selected five public parks in Bratislava with different popularity levels and distinctive characters on Instagram. Once we scraped all available posts[^5], we could discover their detailed content and subjects. We addressed this challenge in several ways, in most of which the hashtags played a key role.

Start exploring the parks by clicking on links, or keep reading about how we crunched the data.

1. [Sad Janka Kráľa]({{< ref "parks/sadjankakrala" >}} "Sad Janka Kráľa")
2. [Horský park]({{< ref "parks/horskypark" >}} "Horský park")
3. [Medická záhrada]({{< ref "parks/medickazahrada" >}} "Medická záhrada")
4. [Mestské lesy]({{< ref "parks/mestskelesy" >}} "Mestské lesy")
5. [Jazero Rohlík]({{< ref "parks/jazerorohlik" >}} "Jazero Rohlík")

# Topic discovery and basic exploration

## 1. Popular hashtags

Finding the most popular hashtags is an obvious approach that can produce intriguing outcomes, especially when tags are grouped into time intervals. This way, we monitored how the frequency of selected topics evolved over the years or varied between weekdays.

{{< datawrapper-table id="datawrapper-chart-pSvD7" margin="-10px 0 30px 0" src="https://datawrapper.dwcdn.net/pSvD7/3/" >}}

## 2. Predefined categories

We then took it a step further by assigning hashtags to the nine categories we came up with. For example, if a post was published with at least one of the tags such as #running, #bike, #hiking, we allocated it to the broader category of “outdoor activities”.

{{< heatmap data="/images/insta/dataviz/csv/all_popular_categories.csv">}}

## 3. Topic modelling

We also took a completely different approach – instead of imposing top-down categories, we delegated the hashtag analysis to unsupervised machine learning algorithms that identified the most important clusters of topics.

How does it work in practice? In a nutshell, the algorithm searches for associations between all the hashtags derived from posts. It then identifies topics and indicates the most representative hashtags for them (we only show 10 of them in the last column). A share of 24.9% in the second column means that the “spring magnolia flowers” topic covers a quarter of all collected hashtags.

{{< datawrapper-table id="datawrapper-chart-gv2bb" margin="-10px 0 30px 0" src="https://datawrapper.dwcdn.net/gv2bb/2/" >}}

This method[^6] proved to be particularly useful in the data mining stage, helping us to uncover relationships between multiple hashtags. To see the details, take a look at the full [data visualisation](http://karolpiekar.ski/slides/lda_medickazahrada.html).

## 4. Image pattern recognition

The last approach to categorization was fundamentally different. While previously, we relied on users’ hashtags, here we examined the photographs themselves. Google Vision API algorithms automatically recognise the content of images and label them (including the level of probability[^7]), which we then grouped or sorted by frequency of occurrence.

![Jazero Rohlík](/images/insta/instagram/2290902017663546334.jpg)

### Jazero Rohlík, photo by sysina93

{{< datawrapper-table-non-resp id="datawrapper-chart-oISa9" margin="10px 0 30px 0" height="375" src="https://datawrapper.dwcdn.net/oISa9/2/" >}}

At this point, we could finally begin the exploration. See examples of what we have discovered.

# Park seasonality

In autumn, every city park experiences a spike in visitors. Who wouldn't want to earn a ton of likes for a trendy photo of colourful chestnut or maple leaves? This pattern is also confirmed by the most common hashtags, which show #fall or #autumn ranking particularly high. However, it was interesting to discover that a different park is more popular in spring because of its blooming flowers. Yet another one turned out to also be frequently attended during the winter season.[^9]

{{< svg "static/images/insta/dataviz/seasons_radar_sad.svg" >}}
{{< svg "static/images/insta/dataviz/seasons_radar_sad_rest.svg" >}}

While the analysis of just one place draws our attention to the highest, most typical values (hashtags or photo labels), the comparison of parks reveals significant features in a broader context and nuances their meaning.

# Implicit links between activities

The post subject is another element that we can gain from when comparing categories. Tracing the popularity of a certain topic is already beneficial in itself. This way we knew that one place is crowded with animal lovers and another with Instagram influencers. Yet, digging deeper and looking at co-occurring categories gave us a broader overview of visitors' activities. We could see, for example, that in one park, happiness is associated with family and elsewhere with animals and outdoor activities.

{{< svg "static/images/insta/dataviz/sad_categories_matrix.svg" >}}

# Shifting user patterns

Another valuable approach was to study how trends changed over time, especially during such a turbulent pandemic period. Exploratory data visualisation played a particular role here, helping us to see the tendencies in the number of posts or frequency of certain hashtags. This way, we saw which parks were losing or gaining traction, as well as how the 2020 lockdowns shifted typical visiting patterns.

{{< datawrapper id="datawrapper-chart-dcElB" src="https://datawrapper.dwcdn.net/dcElB/6/" >}}

While the graph above shows a wider pattern, reinforced by the pandemic, a closer examination of data from just one park reveals what is likely a temporary change in user behaviour over the course of one year.

**>>>>>> This visualisation is going to be interactive**

![Distribution of posts over the year (2018–2020)](/images/insta/dataviz/test_medicka_beeswarm_count_years.png)

Some of our insights were specific to selected parks or single events, but many revealed broader trends in how public spaces are currently used. It will be interesting to see if the pandemic permanently changes how often and in what ways we enjoy city parks. For now, check out our in-depth [reports dedicated to five popular parks]({{< relref "/#parks" >}} "Read more about the parks") in Bratislava.

# Takeaway

## Why is Instagram a valuable data source in the first place?

1. Social media is a popular outlet for city residents to express how they feel about the city in the shape of pictures, videos and captions.
2. Contrary to popular belief, a large and diverse sample of people actively use Instagram nowadays, it is not “just the young people”.
3. Users unconsciously provide data about their usage patterns and sentiments, which in some ways, with a proper interpretation, make the data more relevant than when you directly ask people to express their thoughts or feelings.
4. Although it is easy to question the quality of Instagram data, the posts are relatively easy to obtain, which makes the platform a good candidate for a supplement to other studies.

## In which areas of city research is Instagram data most useful?

1. Monitoring the popularity of places in time.
2. Observing the changes in the perceived and actual character of a place in time (e.g. by hashtags).
3. Tracing the movement of people within the observed space by checking the location from where they posted.
4. Identifying how specific events like festivals, revitalizations of the space or any other irregularities generate change in the surrounding area and influence the visitors’ sentiments.
5. Determining to what extent spaces are represented on Instagram and figuring out their online character. This enables a comparison between the physical space and its portrayal on Instagram.

## What will make the Instagram-based study more accurate?

1. Comparing multiple things rather than focusing on one element could partially offset the problem of unrepresentative data samples from social media.
2. Having a time perspective helps capture occasional spikes in popularity caused by one-off events that could distort the results of wider trend analysis.
3. Selecting a relatively narrow topic can limit the need to deal with irrelevant content and ordinary spam, but being too specific may result in the shortage of posts and insignificant data samples. For example, a study of Bratislava tourism would certainly be interesting, as well as time-consuming. However, it might be challenging to use Instagram data to study just one small street or a single city attraction.

[^1]: API (application programming interface) is a tool that allows other computers to access Instagram posts and download them automatically in large numbers.
[^2]: Based on the following selection hashtags: #aesthetic, #autumnvibes, #coffee, #enjoythelittlethings, #fashiongram, #fashioninspo, #foodporn, #happiness, #instagood, #ootd, #photography, #photooftheday, #photoshoot, #picoftheday, #portraitphotography, #smile, #sonyimages, #vsco, #vscocam.
[^3]: The source code will be available in July 2021.
[^4]: Unlike a few years back, Instagram no longer provides the detailed location of a post (nor is it possible to read it from an image EXIF data) – a major limitation for city researchers.
[^5]: We accessed the posts (excluding stories and videos) via two Instagram API endpoints – using specific hashtags (e.g. #sadjankakrala) and the parks’ location.
[^6]: Read more about [LDA model](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation).
[^7]: By testing multiple diverse samples, we defined a confidence level at above 0.81.
[^8]: To improve the results, we have removed the most generic hashtags: #bratislava, #bratislavacity, #Medickázahrada, #slovakia, #slovensko.
[^9]: Data presented in this article as of April 1, 2021.
