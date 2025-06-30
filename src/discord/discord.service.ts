import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
    private readonly logger = new Logger(DiscordService.name);
    private readonly client = new Client({
        intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        ],
    });

    onModuleInit() {
        const TOKEN = process.env.DISCORD_BOT_TOKEN;
        if (!TOKEN) throw new Error('DISCORD_BOT_TOKEN not set in .env');

        this.client.once('ready', () => {
        this.logger.log(`✅ Logged in as ${this.client.user?.tag}`);
        });

        this.client.on('messageCreate', (message) => {
        this.handleMessage(message);
        });

        this.client.login(TOKEN);
    }

    private async handleMessage(message) {
        if (message.author.bot) return;

        const content = message.content.trim().toLowerCase();
        this.logger.log(`📥 ${message.author.username}: ${content}`);

        if (content.startsWith('/help')) {
        await message.reply(`❓ Available commands: /weather, /time, /stock, /news`);
        }

        // Add other command logic here!
    }
}
