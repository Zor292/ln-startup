require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageFlags,
  ContainerBuilder,
  SeparatorSpacingSize
} = require('discord.js');

const CYAN = 0x00BFFF;
const ICON = 'https://cdn.discordapp.com/icons/1421088112808951852/ca13f20738db342082100fff17d0df93.webp?size=2048';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('clientReady', () => {
  console.log(`✅ البوت جاهز: ${client.user.tag}`);
});

function buildMainMessage() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addMediaGalleryComponents((g) => g.addItems((i) => i.setURL(ICON)))
    .addTextDisplayComponents((t) => t.setContent('**مرحبا بكم في سيرفر LiveZone**\n\nيرجى قراءة القوانين ادناه لتجنب المشاكل والعقوبات'))
    .addSectionComponents((s) =>
      s.addTextDisplayComponents((t) => t.setContent('📋 **شرح السيرفر**'))
       .setButtonAccessory((b) => b.setCustomId('btn_server_desc').setLabel('←').setStyle(ButtonStyle.Secondary))
    )
    .addSectionComponents((s) =>
      s.addTextDisplayComponents((t) => t.setContent('📜 **قوانين السيرفر**'))
       .setButtonAccessory((b) => b.setCustomId('btn_rules').setLabel('←').setStyle(ButtonStyle.Secondary))
    )
    .addSectionComponents((s) =>
      s.addTextDisplayComponents((t) => t.setContent('🎮 **كيفية دخول السيرفر**'))
       .setButtonAccessory((b) => b.setCustomId('btn_how_to_join').setLabel('←').setStyle(ButtonStyle.Secondary))
    )
    .addActionRowComponents((row) =>
      row.setComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_notifications')
          .setPlaceholder('اختر رولات الاشعارات')
          .setMinValues(0)
          .setMaxValues(5)
          .addOptions(
            new StringSelectMenuOptionBuilder().setLabel('منشن شراكات').setValue('role_1471582557316583586').setDescription('استقبال منشن الشراكات').setEmoji('🤝'),
            new StringSelectMenuOptionBuilder().setLabel('منشن هامبورغ').setValue('role_1474806056701001818').setDescription('استقبال منشن هامبورغ').setEmoji('🏙️'),
            new StringSelectMenuOptionBuilder().setLabel('منشن فعاليات').setValue('role_1474806137223381304').setDescription('استقبال منشن الفعاليات').setEmoji('🎉'),
            new StringSelectMenuOptionBuilder().setLabel('منشن اذكار').setValue('role_1474806194114658484').setDescription('استقبال منشن الاذكار').setEmoji('📿'),
            new StringSelectMenuOptionBuilder().setLabel('منشن تسريبات').setValue('role_1474806227262374004').setDescription('استقبال منشن التسريبات').setEmoji('🔍')
          )
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildServerDescContainer() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent('## 📋 شرح السيرفر'))
    .addTextDisplayComponents((t) => t.setContent(
      '**LiveZone** هو سيرفر مختص برول بلاي روبلوكس\n\n' +
      'لدينا فرعين:\n' +
      '🏙️ **فرع Emergency Hamburg** — مدينة هامبورغ\n' +
      '🌆 **فرع Emergency Emden** — مدينة امدن\n\n' +
      'انضم إلينا وعش تجربة رول بلاي واقعية ومنظمة!'
    ))
    .addMediaGalleryComponents((g) => g.addItems((i) => i.setURL(ICON)))
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildHowToJoinContainer() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent('## 🎮 كيفية دخول السيرفر\n\nاختر الفرع الذي تريد الانضمام إليه:'))
    .addActionRowComponents((row) =>
      row.setComponents(
        new ButtonBuilder().setCustomId('btn_join_hamburg').setLabel('🏙️ كيفية دخول هامبورغ').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('btn_join_emden').setLabel('🌆 كيفية دخول امدن').setStyle(ButtonStyle.Primary)
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildJoinHamburgContainer() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent('## 🏙️ كيفية دخول هامبورغ'))
    .addTextDisplayComponents((t) => t.setContent(
      'شاهد الفيديو التالي لمعرفة كيفية دخول سيرفر هامبورغ:\n\n' +
      '🎬 **[اضغط هنا لمشاهدة فيديو الدخول](https://cdn.discordapp.com/attachments/1474439871513759797/1475842657430405241/ScreenRecording_--_--__1.mov?ex=69a82f95&is=69a6de15&hm=98c8759e1806fd763ff1c153aeda0c728b754942f8f11f29b97b2f0edafc65c5&)**'
    ))
    .addActionRowComponents((row) =>
      row.setComponents(
        new ButtonBuilder().setCustomId('btn_how_to_join').setLabel('← رجوع').setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildJoinEmdenContainer() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent('## 🌆 كيفية دخول امدن'))
    .addTextDisplayComponents((t) => t.setContent(
      '**اتبع الخطوات التالية:**\n\n' +
      '**1️⃣** افتح الجوال\n\n' +
      '**2️⃣** اضغط على **Servers**\n\n' +
      '**3️⃣** ادخل الكود:\n```\nEHAGML\n```\n' +
      '**4️⃣** اضغط **Join**\n\n' +
      '✅ تم! مرحباً بك في امدن'
    ))
    .addActionRowComponents((row) =>
      row.setComponents(
        new ButtonBuilder().setCustomId('btn_how_to_join').setLabel('← رجوع').setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildRulesMenuContainer() {
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent('## 📖 اختر نوع القوانين'))
    .addActionRowComponents((row) =>
      row.setComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_rules')
          .setPlaceholder('اختر نوع القوانين')
          .addOptions(
            new StringSelectMenuOptionBuilder().setLabel('قوانين الحياة الواقعية').setValue('rl_rules').setEmoji('🌍'),
            new StringSelectMenuOptionBuilder().setLabel('قوانين الديسكورد').setValue('discord_rules').setEmoji('💬'),
            new StringSelectMenuOptionBuilder().setLabel('قوانين امدن - هامبورغ').setValue('city_rules').setEmoji('🏙️')
          )
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

function buildRulesContainer(type) {
  const contents = {
    rl_rules: {
      title: '🌍 قوانين الحياة الواقعية',
      body:
        '**VDM — قوانين المركبة**\nيمنع استخدام المركبة كوسيلة للقتل أو الدهس. يجب القيادة بشكل واقعي ومنطقي.\n\n' +
        '**RDM — قوانين القتل العشوائي**\nقتل الأشخاص بشكل عشوائي دون تهديد أو عداوة ممنوع منعاً باتاً.\n\n' +
        '**Appreciating Life — تقدير الحياة**\nيجب الخوف على حياتك بشكل واقعي وعدم الذهاب للمناطق الخطرة أو الخروج من المناطق الآمنة في الاستنفار.\n\n' +
        '**NRL — قوانين الحياة الجديدة**\nفي حال إسقاطك يمنع التكلم. إذا تم إسعافك تتذكر ما حدث. إذا تحللت لا تتذكر شيئاً.\n\n' +
        '**Power Gaming**\nيمنع استخدام وسائل خارج الرول للتواصل مع الآخرين.\n\n' +
        '**NVL — الخوف على الحياة**\nعدم الخوف على حياتك في حال تهديدك بالأسلحة ممنوع.\n\n' +
        '**Metagaming**\nأخذ معلومات من خارج الرول مثل ديسكورد أو بث أو أي طريقة أخرى ممنوع.'
    },
    discord_rules: {
      title: '💬 قوانين الديسكورد',
      body:
        '**1-** يمنع السب بجميع أنواعه\n' +
        '**2-** يمنع السبام\n' +
        '**3-** يمنع نشر روابط\n' +
        '**4-** يمنع سحب العدد\n' +
        '**5-** يجب احترام جميع الأعضاء\n' +
        '**6-** يمنع التسبب في مشاكل مع الآخرين\n' +
        '**7-** يمنع التكلم في مواضيع سياسية أو دينية\n' +
        '**8-** يمنع استخدام أوامر في العام\n\n' +
        '⚠️ **تنبيه:** تجاوزك للقوانين قد يعرضك للباند من 24 إلى 42 ساعة\n\n' +
        '✅ انتهت القوانين — شكراً لك'
    },
    city_rules: {
      title: '🏙️ قوانين امدن - هامبورغ',
      body:
        '**1- قوانين القبض**\nيمنع التيزر إلا إذا رفع الشخص يده أو هرب. في حال ماسك سلاح يمنع التيزر نهائياً.\n\n' +
        '**2- قوانين السرقة والتفاوض**\nبقالة: لا يقل المجرمون عن 3. بنك: لا يقل المجرمون عن 5 ويجب مساواة عدد العسكر.\n\n' +
        '**3- قوانين الاحتلال**\nاحتلال مقر: يجب تواجد أعضاء العصابة. احتلال مدينة: يجب تواجد الشرطة والحرب منظمة.\n\n' +
        '**4- قوانين التحرير**\nيجب تواجد الطرف الآخر وتساوي الأعداد مع خطة محكمة ومداهمة منظمة.\n\n' +
        '**5- قوانين مداهمة القسم**\nيمنع إلا لسبب مهم جداً (عضو أو بوس العصابة) وبطريقة منظمة.\n\n' +
        '**6- قوانين الخطف**\nلا يقل العدد عن 3. في حال رفع أسلحة عليك ارفع يدك فوراً.\n\n' +
        '**7- قوانين الإعدام**\nمجرمون: لا يقل العدد عن 3 وطريقة قانونية. شرطة: يمنع الإعدام إلا بمحكمة وعدد لا يقل عن 3.\n\n' +
        '⚠️ **تنبيه:** مخالفتك للقوانين قد يعرضك للباند من 24 إلى 42 ساعة\n\n' +
        '✅ انتهت القوانين — شكراً لك'
    }
  };

  const { title, body } = contents[type];
  return new ContainerBuilder()
    .setAccentColor(CYAN)
    .addTextDisplayComponents((t) => t.setContent(`## ${title}`))
    .addTextDisplayComponents((t) => t.setContent(body))
    .addActionRowComponents((row) =>
      row.setComponents(
        new ButtonBuilder().setCustomId('back_to_rules').setLabel('← رجوع للقائمة').setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents((t) => t.setContent('-# developed by firas'));
}

// ══════════════════════════════════════════════════════
client.on('interactionCreate', async (interaction) => {

  if (interaction.isChatInputCommand() && interaction.commandName === 'mapsend') {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      await interaction.channel.send({ components: [buildMainMessage()], flags: MessageFlags.IsComponentsV2 });
      await interaction.editReply({ content: '✅ تم إرسال الإمبد بنجاح!' });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: `❌ خطأ: ${err.message}` });
    }
    return;
  }

  if (interaction.isButton() && interaction.customId === 'btn_server_desc') {
    await interaction.reply({ components: [buildServerDescContainer()], flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral });
    return;
  }

  if (interaction.isButton() && interaction.customId === 'btn_rules') {
    await interaction.reply({ components: [buildRulesMenuContainer()], flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral });
    return;
  }

  if (interaction.isButton() && interaction.customId === 'btn_how_to_join') {
    await interaction.reply({ components: [buildHowToJoinContainer()], flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral });
    return;
  }

  if (interaction.isButton() && interaction.customId === 'btn_join_hamburg') {
    await interaction.update({ components: [buildJoinHamburgContainer()], flags: MessageFlags.IsComponentsV2 });
    return;
  }

  if (interaction.isButton() && interaction.customId === 'btn_join_emden') {
    await interaction.update({ components: [buildJoinEmdenContainer()], flags: MessageFlags.IsComponentsV2 });
    return;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'select_rules') {
    await interaction.update({ components: [buildRulesContainer(interaction.values[0])], flags: MessageFlags.IsComponentsV2 });
    return;
  }

  if (interaction.isButton() && interaction.customId === 'back_to_rules') {
    await interaction.update({ components: [buildRulesMenuContainer()], flags: MessageFlags.IsComponentsV2 });
    return;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'select_notifications') {
    const allRoleIds = ['1471582557316583586','1474806056701001818','1474806137223381304','1474806194114658484','1474806227262374004'];
    const member = interaction.member;
    const selectedRoles = interaction.values.map(v => v.replace('role_', ''));
    try {
      for (const id of allRoleIds) {
        const role = interaction.guild.roles.cache.get(id);
        if (role && member.roles.cache.has(id)) await member.roles.remove(role).catch(() => {});
      }
      const added = [];
      for (const id of selectedRoles) {
        const role = interaction.guild.roles.cache.get(id);
        if (role) { await member.roles.add(role).catch(() => {}); added.push(role.name); }
      }
      const msg = added.length > 0 ? `✅ تم تفعيل: **${added.join(', ')}**` : '✅ تم إلغاء جميع رولات الاشعارات.';
      await interaction.reply({ content: msg, flags: MessageFlags.Ephemeral });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ تأكد أن رتبة البوت أعلى من الرولات وأن لديه Manage Roles.', flags: MessageFlags.Ephemeral });
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
