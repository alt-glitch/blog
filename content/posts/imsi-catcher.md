---
title: Making an IMSI Catcher in 2nd year of Undergrad
tags:
  - security
created: 2022-12-12
draft: "false"
link: imsi-catcher
---
> I did this as a semester project back in undergrad when I was diving into RF/RF hacking. Ended up playing a lot with RF tools. This post should mostly cover all that I dived into those 3 months!

## 1.0) Introduction

Wireless cellular communication technology has changed the way we communicate with each other. From the introduction of the 1G technology to the masses to the widespread adoption of 4G LTE Technology, each generation of wireless technology has improved upon the last and increased the functionality and use cases, leading to the deprecation of the previous generation over a period of time.
However the 2nd Generation of wireless cellular communication, or Global Standard for Mobile Communication (GSM) still has a large user base in many countries including India, where the majority of the cell phones are feature phones operating on a GSM network. Hence it is important to understand the technology behind this standard of wireless cellular communication, and its security (or lack thereof)

### 1.1) Purpose

The purpose of this project is to understand the GSM Standard (2nd Generation) of Wireless Cellular Communication. This is done by first using and learning about Software-Defined Radio (SDR), its hardware and software tools and thereafter using SDR to analyze the GSM technology and security.

### 1.2) Scope

The scope of the project developed now is as follows:
1.  Passive sniffing of GSM Packets
2.  Capturing International Mobile Subscriber Identity Numbers (IMSI)
3.  Long-Term Intelligence from passive sniffing and IMSIs

However, with more resources, tools and time, the project can further be expanded to:
1.  Active sniffing of GSM Packets / Active IMSI Catcher
2.  Cracking A5/1 Encryption used in GSM
3.  Study of further attacks and flaws in GSM
4.  IMSI Catcher for 4G LTE Networks

### 1.3) Overview

1.  Understanding the telecommunication landscape
2.  Comparison of technology of different generations of cellular communication; 1G vs. 2G vs. 3G vs. 4G vs. 5G
3.  Understanding GSM (Global System for Mobile Communication) Technology
4.  Introduction to Software-Defined Radio
5.  Sniffing GSM IMSIs with Software-Defined Radio
6.  Data aggregation and long term intelligence
7.  GSM Security
8.  A note on cellular security

---

## 2.0) Cellular Communication Landscape

The most important development in telecommunication industry is the cellular structure. This concept and technology was developed by AT&T Bell Labs in 1970s and incorporated into the first generation wireless communication system. All the wireless communication systems still follow this model.
The cellular structure means that wireless coverage is divided into areas which a particular BTS covers and provides service to.

|                 ![[Pasted image 20201220204904.png]]                 |
| :--------------------------------------------------------------------------------: |
| Notice the cellular coverage area depends on the density or the population covered |

To minimize the interference and maximize the connections, a Spoke and Hub Network Model is followed.

|![[Pasted image 20201220212253.png]]|
|---|
|For local connection, ie within the same cell or BTS, it is done with the via wireless links with small transmission power|
|For connection between far off cells, access points and wired links are used|

With the understanding of the structure of the cellular communication landscape we can dive into the technology behind the different generations of wireless telecom.

---

## 3.0) Comparison between different generations of cellular communication

Services/Generation | 1G | 2G | 3G | 4G
---|---|---|---|---
Voice | Analog | Digital | Digital | Voice Over LTE
SMS | N/A | Available | Available | Available 
Data Rate | N/A | `~300Kbps` | `~10Mbps` | `100Mbps and more`
Transmission | Analog | Digital | Digital | Digital
Multiple Access | Frequency Division | Time Division or Code Division | Code Division | Orthogonal frequency-division
Standards | NMT/TACS/AMPS | GSM; GPRS-EDGE; US-TDMA | WCDMA; CDMA-2000 | LTE

---

## 4.0) Understanding GSM Technology
### 4.1) Overview
GSM standard was first developed as a digital, circuit switched, telecom standard deployed majorly in Europe and Asia. GSM operates on the mobile communication bands of 900 MHz and 1800 MHz in most parts of the world.
GSM standard served 80% of the mobile market, making it the most ubiquitous of the many standards for cellular networks. Currently, in many parts of the world GSM is being phased out in replacement of 4G LTE and 5G systems. However, in India, GSM still has a very large user base, mostly of feature phone users leading telecom companies to discontinue 3G, and have 2G GSM and 4G LTE running in parallel.

### 4.2) Architecture
GSM Consists of many functional units which can be broadly divided into:
1. The Mobile Station (MS)
2. The Base Station Subsystem (BSS)
3. The Network Switching Subsystem (NSS)
4. The Operation Support Subsystem (OSS)

For the scope of this report, the MS and BSS are relevant as they handle the user end of the connection.

#### 4.2.1) The Mobile Station
The mobile station consists of the hand-held device and a GSM Subscriber Identity Module (SIM) Card. The SIM is an integrated circuit which stores the International Mobile Subscriber Identity (IMSI) number and its related secret key which is used to authenticate and identify users. 
IMSI is 14 or 15 digit long and has the following format:

MCC | MNC | MSIN
---|---|---
404 | 10 | 06199XXXXX
India Country Code | Airtel - Delhi NCR Network Code | Unique MSIN


#### 4.2.2) The Base Station Subsystem (BSS)
BSS comprises of Base Transceiver Station and Base Station Controller. 
- BTS houses the radio transceiver that define a cell and handle the encoding, encryption, decoding, decryption, modulation etc functionality
- BSS manages one or more BTSs and handles the radio setup, frequency hopping and handover

### 4.3) Connection in GSM
Phones have the inherent functionality of connecting with a BTS which has higher signal strength and quality. Once the phone identifies the stronger base station, it starts negotiating a connection with it.

![[Pasted image 20201221150142.png]]

Hereafter, the cell tower decides which encryption algorithm to use or whether to even use encryption or not. This information along with an Identity Request is sent out, to which the cell phone responds with its IMSI Number.

In subsequent generations of telecommunication, the procedure has evolved and added multiple security measure leaving GSM to be the most insecure standard in use as of now.

---

## 5) Introduction to Software-Defined Radio
Software-Defined Radio (SDR) is the software implementations of hardware components. Hardware, which in traditional radio would have processed the signal now works as software components. This allows to control and make software programs having a much more control on the radio signal.

![[Pasted image 20201108124641.png]]

### 5.1) SDR Tools and Hardware
#### HackRF
HackRF is an open source SDR board with Receiving and Transmission Capabilities
![[IMG_20201108_180133.jpg]]
#### GNU Radio
GNURadio is a SDK that provides signal processing blocks to implement software radios.
![[Pasted image 20201108185005.png]]

#### `gqrx`
gqrx is used for basic radio tuning and to get a rough overview of the transmissions around.
![[Pasted image 20201108151653 1.png]]

#### `gr-gsm`
`gr-gsm` is a set of tools used to receive GSM transmissions and works with any SDR capable of tuning into the GSM frequency.

![[Pasted image 20201221131219.png]] 

---

## 6) A note on IMSI Catchers

GSM IMSI are unique to each individual GSM user. It is meant to be private as it links the user and his/her physical location, SMS, voice call and data.

![[Pasted image 20201221151635.png]]

### 6.1) Active IMSI catchers
Active IMSI Catchers function as Fake BTSs and establish a connection with cellphones. They advertise a higher strength connection and offer connection to cellphones around that region. Then, during the connection negotiation, it disables encryption (something which is a possibility in only GSM) and then sends an Identity Request to capture the IMSI. From hereon, the Fake BTS can read all the data since it is unencrypted

![[Pasted image 20201221150824.png]]

In successive generations, ie 3G and 4G LTE, the attack gets more complex. The attacker with his fake BTS would try to spoof the connection request and act Man-in-the-Middle. Then the service would get downgraded to the non-encrypted GSM instead of more secure 3G/4G

![[Pasted image 20201221151300.png]]

### 6.2) Passive IMSI Catchers
With the help of SDR, one can develop a passive IMSI Catcher. Here there is no interaction with the cellphones

Whenever a cellphone connects with a new cell tower, the connection procedure takes place. This can easily be captured as this is unencrypted traffic and the response to the Identity Request is sent without encryption.

---

## 7) Passive IMSI Catching with SDR
> For the sake of this report, the installation of the tools shall not be covered

To first listen in on the GSM network, we find out the down link frequency of any nearby base station. In India, the GSM network follows the [PGSM-900 and GSM-1800 standard](https://en.wikipedia.org/wiki/GSM_frequency_bands). Meaning, the GSM Connections are of either 900MHz or 1800MHz.

To tune in to the frequency we use our SDR hardware and `gqrx` to find the exact down link.

We first connect the HackRF and add the kernel module with 
```
sudo modprobe hackrf
```

Then we fire up our tool;
```
gqrx
```

Then we slowly browse the range of 900MHz - 960MHz to find any peaks.

![[Pasted image 20201221153625.png]]

Once found, we note down the frequency.
Next, we start up our GSM monitor;
```
grgsm_livemon
```
Now we tune into the frequency we found above until we notice GSM output;

![[Pasted image 20201221154412.png]]

In another terminal, we start our IMSI Catcher with;
```
sudo python simple_IMSI-catcher.py --sniff -t log.txt
```

Now, we wait for some new connections to be established on the cell tower on whose downlink we are listening in on;

![[Pasted image 20201221154816.png]]

After some time, we can notice that we have captured the IMSI and TMSI of some new connections.

Ideally, you shouldn't be able to do anything with capturing *just* IMSI, but problems arise when you start to associate an IMSI with an individual. Usually law enforcement has access to this kind of database linking users and IMSIs. 
One often overlooked method is through mobile applications. Apps can access a device's IMSI number (on Android), which is sometimes collected and used to serve as a unique user identifier. IMSIs can be stored alongside names, phone numbers and email addresses in customer databases. Customer databases are commonly sold to 3rd parties for marketing purposes, and of course have potential to be stolen. Now all of the sudden you have databases with IMSI numbers and names on the internet, which is bad.

---
## 8) Data Aggregation and Long-Term Intelligence
## Background
The HackRF One was set up in a residential area with moderate movement. One should expect to see low activity during the late hours and higher activity during the day. Moreover, if the device had been set up in a very active area, near a main road or highway, one might see large sets of IMSIs.
The downlink frequency I could tune into was `949MHz`

While Passive IMSI Catching won't do any harm, one can extract quite useful insights by collecting logs and using a data aggregator tool. 

The tool in use also supports log creation with different levels of verbosity, 
```
sudo python simple_IMSI-catcher.py -a --sniff -t imsi00.txt
```
> `-a` denotes that GSM Packets with IMSI would also be saved
> `-t imsi00.txt` denotes that all the output would be saved in a file in CSV format

![[Pasted image 20201221174037.png]]

 Using shall use Splunk as a data aggregator.
 We can install Splunk on Arch-based systems with
 ```
 sudo pacman -S splunk
 ```

 And start it with;
 ```
 sudo /opt/splunk/bin/splunk start
 ```

We get a web interface like;
![[Pasted image 20201221175535.png]]

We upload our log file to Splunk;
![[Pasted image 20201221175654.png]]

Now, we can start searching through our logs, extract fields or add more log files. All in all, we can visualise and play with our data now.
![[Pasted image 20201221180935.png]]

### Interesting Findings
Using the Splunk Processing Language (SPL) one can query the dataset based on different parameters. Here are some interesting insights I could find.
For clarity, I ran the tool and collected logs four times, each time during different parts of the day and for different periods of time.

#### IMSI Brands - Finding #1
After going through the logs, I found that these were the top GSM brands whose IMSIs I could capture.
![[Pasted image 20201222095506.png]]

It is a bit strange that almost all of them were of Airtel. To find out why I did a little research.
Going through the Mobile Network Code and Frequency Band list on [Wikipedia](https://en.wikipedia.org/wiki/Mobile_Network_Codes_in_ITU_region_4xx_(Asia)), I found out this:
![[Pasted image 20201222100026.png]]

Airtel primarily operates on GSM-900 whereas Vodafone, the other major GSM operator, operates on GSM-1800. Since I could only tune into GSM-900, almost all of the IMSIs I captured where of Airtel.

#### IMSI Brands - Finding #2
From the above, finding we get to know that an Airtel tower must be nearby. Airtel allows anyone to view all the network towers it has [here](https://www.airtel.in/opennetwork/).
We find out that there indeed does exist a 2G tower quite near to where we deployed our IMSI Catcher.
![[Pasted image 20201222100623.png]]


#### Popular IMSIs - Finding #3
This chart shows some IMSI numbers which were captured multiple times
![[Pasted image 20201222090807.png]]

This leads us to assume that these IMSI users often went outside the range of our cell tower and connected back in. We can dig deeper and find out what time period were their IMSIs caught.
It is safe to conclude that many of these IMSI users frequent in and out of the coverage of the cell tower.

#### Activity - Finding #4
Looking through the user activity during different periods of time, we see that most IMSIs were captured during the afternoon hours, when most users were mobile and active.
![[Pasted image 20201222102508.png]]

The activity during late night from 10pm to 8am was significantly low
![[Pasted image 20201222102632.png]]

And the activity during morning hours was moderate for a short period of time
![[Pasted image 20201222102733.png]]

## 9) A Note on GSM Security
There have been multiple vulnerabilities demonstrated in different parts of the GSM Standard over the years. As we can see, with a more advanced set up and more resources, one can demonstrate and make a full fledged IMSI Catcher. However, the encryption algorithms, A5/1, A5/2, A5/3 have been proven to be weak and breakable in real time. 
In fact, with an A5/1 rainbow table and some more processing power, one can crack the A5/1 encryption in real time, over the air.

Moreover, GSM is the only standard which allows unencrypted traffic leading to downgrade attacks, where 3G/4G connections are forced to downgrade to 2G without encryption. 

With 2G GSM **still** being used in our country and some providers deprecating 3G instead of 2G, it begs to the question as to why this maybe and whether these well known GSM vulnerabilities are being exploited in regions where 2G GSM is the only offering available.

## 10) References
- [Wireless Communications for Everyone](https://www.coursera.org/learn/wireless-communications/)
-  [Gotta Catch 'Em All: Understanding How IMSI-Catchers Exploit Cell Networks](https://www.eff.org/wp/gotta-catch-em-all-understanding-how-imsi-catchers-exploit-cell-networks)
-  [Python Simple IMSI Catcher](https://github.com/Oros42/IMSI-catcher)
-  [Building a Passive IMSI Catcher](https://harrisonsand.com/imsi-catcher/)
-  [GSM Frequency Bands](https://en.wikipedia.org/wiki/GSM_frequency_bands)