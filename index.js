// Discord読み込み
const {
	Discord,
	Client,
	Intents
} = require('discord.js');

// Discordクライアント読み込み
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS
	],
	partials: [
		'USER',
		'GUILD_MEMBER'
	]
});

// サーバー構築用モジュール読み込み
const express = require('express');
const server = express();

const fetch = require("node-fetch")

//時刻整形モジュール
const moment = require('moment-timezone')

// 設定読み込み
const config = require("./config.json")

server.get("/auth", async function(req, res, codea) {
	const type = req.query.type
	const code = req.query.code
	if (!type) return;
	if (code) {
		console.log(`${nt()} : 認証開始`)
		// アクセストークンリクエスト
		const body = `client_id=${config.clientId}&client_secret=${process.env['client-secret']}&grant_type=client_credentials&grant=identify guilds&redirect_uri=https%3A%2F%2Fpjsauth.kinakomochi.repl.co%2Fauth%3Ftype%3Dadvert&code=${code}`
		const url = "https://discord.com/api/oauth2/token";
		const opt = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: body
		}

		fetch(url, opt)
			.then(res => res.text())
			.then(text => console.log(text))
			.catch(err => console.log(err))

		/*	.then(result => {
				console.log(`${nt()} : アクセストークン取得成功`)
				console.log(result)
				// アクセストークンの取得
				const access_token = result.access_token
				// ユーザーが参加しているサーバーを取得
				oauth.getUserGuilds(access_token)
					.then(result => {
						console.log(`${nt()} : サーバー参加状況取得成功`)
						// プロ鯖が含まれているか確認
						let matchData = result.filter(function(item, index) {
							if (item.id == config.guildId) return true;
						})
						if (matchData[0]) {
							console.log(`${nt()} : サーバーへの参加確認`)
							// ユーザーを取得
							oauth.getUser(access_token)
								.then(member => {
									console.log(new Data() + " : ユーザー情報取得成功")
									// プロセカ民営公園のGuildクラスを取得
									const guild = client.guilds.cache.get(config.guildId)
									// 対象のGuildMemberクラスを取得
									const target = guild.members.cache.get(member.id)
									let roleId
									let authText
									let etype
									switch (type) {
										case "advert":
											roleId = '960805936497295390'
											authText = '宣伝できる人ロールの取得'
											etype = false
											break;
	
										default:
											etype = true
											break;
									}
									// ロールがきちんと指定されているか
									if (!etype) {
										// ロールを持っていないか
										if (!target.roles.cache.has(roleId)) {
											// ロール付与
											target.roles.add(roleId)
											// タグの取得
											const tag = member.username + "#" + member.discriminator
											// ログ投稿										
											client.channels.cache.get('961604384431673364').send(
												`日付：${nt()}\n` +
												`認証したユーザータグ：${tag}\n` +
												`認証したユーザーのID：${member.id}\n` +
												`認証内容：${authText}\n` +
												`\n----------------------------------------------------------------------------------------------------`
											)
											console.log(`${nt()} : OK`)
											//メッセージを表示
											res.send("Roles successfully added!");
											return;
										} else {
											console.log(`${nt()} : 既にロールを取得しています。`)
											res.send(nt() + config.errorMessage[6])
											return;
										}
									} else {
										console.log(`${nt()} : ロールが指定できませんでした。`)
										res.send(nt() + config.errorMessage[5])
										return;
									}
								})
								.catch((e) => {
									console.log(`${nt()} : ${e}`)
									res.send(nt() + config.errorMessage[4])
									return;
								})
						} else {
							console.log(`${nt()} : サーバーに参加していないユーザーです。`)
							res.send(nt() + config.errorMessage[3])
							return;
						}
					})
					.catch((e) => {
						console.log(`${nt()} : ${e}`)
						res.send(nt() + config.errorMessage[2])
						return;
					})
			})
			.catch((e) => {
				console.log(`${nt()} : ${e}`)
				res.send(nt() + config.errorMessage[1])
				return;
			})*/
	} else {
		console.log(`${nt()} : コードがありません。`)
		res.send(nt() + config.errorMessage[0])
		return;
	}
});

server.listen('3000', () => {
	console.log('Application started');
});

function nt() {
	const time = moment(new Date).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss');
	return time;
}

/*{
				"client_id": config.clientId,
				"client_secret": process.env['client-secret'],
				"grant_type": "client_credentials",
				"grant": "identify guilds",
				"redirect_uri": "https%3A%2F%2Fpjsauth.kinakomochi.repl.co%2Fauth%3Ftype%3Dadvert",
				"code": code
		}*/