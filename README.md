<h1 align='center'>Chain Idle</h1>

An open-source play-to-earn idle game where you improve your character's skills and earn resources for your hard work.

- Mint ERC-721 NFT characters with upgradable skills on-chain
- Buy ERC-1155 NFT tools from the shop
- Stake your character and tool on a contract to start earning ERC-20 rewards
- Craft unique ERC-721 upgraded tools from the forgery
- Sell your tools on the marketplace
- Open loot boxes with parts, tools and more

</p>

<br />

## How it works

The character NFT contract stores knowledge of the experience each character has earned for each skill in the game. Experience on each character NFT is earned by staking the character along with a tool on one of the contracts that implements [IStake](./contracts/contracts/interface/IStake.sol).

Each staking contract earns experience for a different skill, along with ERC-20 rewards for performing the staking; both of which are different for each staking contract.

For example, staking a [Character NFT](./contracts/contracts/PlayerCharacters.sol) alongside a [Pickaxe NFT](./contracts/contracts/mining/tools) onto the [Mining contract](./contracts/contracts/mining/Mining.sol) increases the players' `Mining` skill every block, and earns them different amounts of ERC-20 rewards such as the [Stone](./contracts/contracts/mining/rewards/Stone.sol) and [Iron](./contracts/contracts/mining/rewards/Iron.sol) tokens.

The tokens you can earn from staking depend on how proficient you are in the skill and how powerful the tools you are staking are! You'll need to become powerful in the skill and own the right tools for the job to earn the rarer tokens available. Experts will learn and combine certain [Tools](./contracts/contracts/interface/ITool.sol) and [Parts](./contracts/contracts/interface/IPart.sol) to create unique ERC-721 "upgraded tools" from the forgery that enable even stronger capabilities.

You can buy tools from the shop using the tokens you earn, by trading in your tokens for tools, parts, or special loot boxes that contain random rewards. Sometimes the shopkeeper doesn't have what you're looking for, which is where other players can help you out in the [Marketplace](https://portal.thirdweb.com/pre-built-contracts/marketplace). Players are free to buy, sell or trade any of the NFTs they own in the marketplace in return for resources or MATIC.

In case you find yourself with resources that are in high demand, you will be able to sell them on the open marketplace, for other players to buy. The players are in full control of the market, setting the price

TLDR:

- Character NFTs = you (you get better at skills the more you do it, this data lives on-chain)
- Tool NFTs = the tool for the job (such as a pickaxe for mining)
- Parts = upgrades for your tools, which can be combined to create brand new "upgraded tool" NFTs.
- Staking contracts = you performing an "action" idly (such as mining)
- Tokens = the rewards for acting (such as the Stone token for mining)
- There's a shop to buy tools, a marketplace to trade with other players, and loot boxes to open random rewards.

<br/>

## Why tho?

This project is a fun side project for me to build with Solidity, the [thirdweb Solidity SDK](https://portal.thirdweb.com/thirdweb-deploy/contract-extensions?utm_source=chainidle) and the [thirdweb CLI](https://portal.thirdweb.com/thirdweb-deploy/thirdweb-cli?utm_source=chainidle).

I've made it open-source so that others can learn from it too, and make sure to [GTFOL](https://twitter.com/_buildspace/status/1544437128620384258)!

I'll be posting regular updates on the progress on my Twitter: [@jarrodwattsdev](https://twitter.com/jarrodwattsdev), if you want to follow my progress!

[![Twitter Followers](https://img.shields.io/twitter/follow/jarrodwattsdev?label=Twitter%20Followers!&style=social)](https://twitter.com/intent/follow?screen_name=jarrodwattsdev)
