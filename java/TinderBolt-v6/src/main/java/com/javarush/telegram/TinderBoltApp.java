package com.javarush.telegram;

import io.github.cdimascio.dotenv.Dotenv;
import org.jetbrains.annotations.NotNull;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.objects.*;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import java.util.ArrayList;
import java.util.Arrays;

public class TinderBoltApp extends MultiSessionTelegramBot {
    public static String TELEGRAM_BOT_NAME;
    public static String TELEGRAM_BOT_TOKEN;
    public static String OPEN_AI_TOKEN;

    private static void loadEnvVariables() {
        Dotenv dotenv = Dotenv.load();
        TinderBoltApp.TELEGRAM_BOT_NAME = dotenv.get("TELEGRAM_BOT_NAME");
        TinderBoltApp.TELEGRAM_BOT_TOKEN = dotenv.get("TELEGRAM_BOT_TOKEN");
        TinderBoltApp.OPEN_AI_TOKEN = dotenv.get("OPEN_AI_TOKEN");
    }

    private static void validateOpenAiToken() {
        if (TinderBoltApp.OPEN_AI_TOKEN == null) {
            System.out.println("OPEN_AI_TOKEN is absent");
            System.exit(1);
        }
    }

    private static ArrayList<UserInfo.Question> createMyInfoQuestions() {
        return new ArrayList<>(
                Arrays.asList(
                        new UserInfo.Question("Имя"),
                        new UserInfo.Question("Пол"),
                        new UserInfo.Question("Возраст"),
                        new UserInfo.Question("Город"),
                        new UserInfo.Question("Профессия"),
                        new UserInfo.Question("Хобби"),
                        new UserInfo.Question("Внешность"),
                        new UserInfo.Question("Доход, богатство"),
                        new UserInfo.Question("Что меня раздражает в людях"),
                        new UserInfo.Question("Цель знакомства")
                ));
    }

    private static ArrayList<UserInfo.Question> createCompanionInfoQuestions() {
        return new ArrayList<>(
                Arrays.asList(
                        new UserInfo.Question("Имя"),
                        new UserInfo.Question("Возраст"),
                        new UserInfo.Question("Внешность"),
                        new UserInfo.Question("Хобби"),
                        new UserInfo.Question("Профессия"),
                        new UserInfo.Question("Город")
                ));
    }

    private final ChatGPTService chatGptService;
    private DialogMode currentMode = null;
    private ArrayList<String> userHistoryMessages = new ArrayList<>();
    private UserInfo me;
    private UserInfo companion;

    public TinderBoltApp() {
        super(TinderBoltApp.TELEGRAM_BOT_NAME, TinderBoltApp.TELEGRAM_BOT_TOKEN);
        TinderBoltApp.validateOpenAiToken();
        chatGptService = new ChatGPTService(TinderBoltApp.OPEN_AI_TOKEN);
    }

    @Override
    public void onUpdateEventReceived(Update update) {
        String messageReceived = getMessageText();

        if (messageReceived.equals("/start")) {
            handleStartCommand();
            return;
        }

        if (messageReceived.equals("/gpt")) {
            handleGptCommand();
            return;
        }
        if (currentMode == DialogMode.GPT && !isMessageCommand()) {
            handleGptModeAction(messageReceived);
            return;
        }

        if (messageReceived.equals("/date")) {
            handleDateCommand();
            return;
        }
        if (currentMode == DialogMode.DATE && !isMessageCommand()) {
            String pressedButtonKey = getCallbackQueryButtonKey();
            handleDateModeAction(messageReceived, pressedButtonKey);
            return;
        }

        if (messageReceived.equals("/message")) {
            handleMessageCommand();
            return;
        }
        if (currentMode == DialogMode.MESSAGE && !isMessageCommand()) {
            String pressedButtonKey = getCallbackQueryButtonKey();
            handleMessageModeAction(messageReceived, pressedButtonKey);
            return;
        }

        if (messageReceived.equals("/profile")) {
            handleProfileCommand();
            return;
        }
        if (currentMode == DialogMode.PROFILE && !isMessageCommand()) {
            handleProfileModeAction(messageReceived);
            return;
        }

        if (messageReceived.equals("/opener")) {
            handleOpenerCommand();
            return;
        }
        if (currentMode == DialogMode.OPENER && !isMessageCommand()) {
            handleOpenerModeAction(messageReceived);
            return;
        }

        sendEchoMessage(messageReceived);
    }

    private void handleStartCommand() {
        currentMode = DialogMode.MAIN;
        sendPhotoMessage("main");
        String answerText = TinderBoltApp.loadMessage("main");
        sendTextMessage(answerText);
        showMainMenu(
                "Главное меню бота", "/start",
                "Генерация Tinder-профиля", "/profile",
                "Сообщение для знакомства", "/opener",
                "Переписка от вашего имени", "/message",
                "Переписка со звёздами", "/date",
                "Задать вопрос ChatGPT", "/gpt"
        );
    }

    private void handleGptCommand() {
        currentMode = DialogMode.GPT;
        sendPhotoMessage("gpt");
        String invitationMessage =  TinderBoltApp.loadMessage("gpt");
        sendTextMessage(invitationMessage);
    }

    private void handleGptModeAction(String messageReceived) {
        String prompt = TinderBoltApp.loadPrompt("gpt");
        Message pendingMessage = sendTextMessage("Подождите, ChatGPT думает...");
        String chatGptAnswer = chatGptService.sendMessage(prompt, messageReceived);
        updateTextMessage(pendingMessage, chatGptAnswer);
    }

    private void handleDateCommand() {
        currentMode = DialogMode.DATE;
        sendPhotoMessage("date");
        String invitationMessage =  TinderBoltApp.loadMessage("date");
        sendTextButtonsMessage(
                invitationMessage,
                "Ариана Гранде", "date_grande",
                "Марго Робби", "date_robbie",
                "Зендея", "date_zendaya",
                "Райан Гослинг", "date_gosling",
                "Том Харди", "date_hardy"
        );
    }

    private void handleDateModeAction(String messageReceived, @NotNull String selectedCompanionKey) {
        if (!selectedCompanionKey.isEmpty()) {
            handleDateCompanionSelect(selectedCompanionKey);
        } else {
            handleRegularDateMessage(messageReceived);
        }
    }

    private void handleDateCompanionSelect(String selectedCompanionKey) {
        String prompt = TinderBoltApp.loadPrompt(selectedCompanionKey);
        chatGptService.setPrompt(prompt);
        sendPhotoMessage(selectedCompanionKey);
        sendTextMessage("Отличный выбор!\nТвоя задача - пригласить эту звезду на свидание.\nТвой ход!");
    }

    private void handleRegularDateMessage(String dateMessageReceived) {
        Message pendingMessage = sendTextMessage("Подождите, собеседник набирает текст...");
        String chatGptAnswer = chatGptService.addMessage(dateMessageReceived);
        updateTextMessage(pendingMessage, chatGptAnswer);
    }

    private void handleMessageCommand() {
        currentMode = DialogMode.MESSAGE;
        sendPhotoMessage("message");
        sendTextButtonsMessage(
                "Пришлите сюда вашу переписку",
                "Следующее сообщение", "message_next",
                "Пригласить на свидание", "message_date"
        );
    }

    private void handleMessageModeAction(String messageReceived, @NotNull String buttonKey) {
        if (buttonKey.startsWith("message_")) {
            handleHistoryBasedMessageCreation(buttonKey);
        } else {
            userHistoryMessages.add(messageReceived);
        }
    }

    private void handleHistoryBasedMessageCreation(@NotNull String messageModeButtonKey) {
        String prompt =  TinderBoltApp.loadPrompt(messageModeButtonKey);
        String userChatHistory = String.join("\n\n", userHistoryMessages);
        Message pendingMessage = sendTextMessage("Подождите, ChatGPT думает...");
        String chatGptAnswer = chatGptService.sendMessage(prompt, userChatHistory);
        updateTextMessage(pendingMessage, chatGptAnswer);
    }

    private void handleProfileCommand() {
        currentMode = DialogMode.PROFILE;
        sendPhotoMessage("profile");
        me = new UserInfo(TinderBoltApp.createMyInfoQuestions());
        String invitationMessage =  TinderBoltApp.loadMessage("profile");
        String firstQuestionText = me.getCurrentQuestionText();
        sendTextMessage(invitationMessage + "\n\n" + firstQuestionText);
    }

    private void handleProfileModeAction(String questionAnswerText) {
        if (me.hasCurrentQuestion()) {
            me.setCurrentQuestionAnswer(questionAnswerText);

            if (me.hasNextQuestion()) {
                me.goToNextQuestion();
                String questionText = me.getCurrentQuestionText();
                sendTextMessage(questionText);
            } else {
                Message pendingMessage = sendTextMessage("ChatGPT создаёт текст для профиля, подождите...");
                String prompt = TinderBoltApp.loadPrompt("profile");
                String myFullInfo = me.toString();
                String chatGptAnswer = chatGptService.sendMessage(prompt, myFullInfo);
                updateTextMessage(pendingMessage, chatGptAnswer);
                currentMode = null;
            }
        }
    }

    private void handleOpenerCommand() {
         currentMode = DialogMode.OPENER;
         sendPhotoMessage("opener");
         companion = new UserInfo(TinderBoltApp.createCompanionInfoQuestions());
         String invitationMessage =  TinderBoltApp.loadMessage("opener");
         String firstQuestionText = companion.getCurrentQuestionText();
         sendTextMessage(invitationMessage + "\n\n" + firstQuestionText);
    }

    private void handleOpenerModeAction(String questionAnswerText) {
        if (companion.hasCurrentQuestion()) {
            companion.setCurrentQuestionAnswer(questionAnswerText);

            if (companion.hasNextQuestion()) {
                companion.goToNextQuestion();
                String questionText = companion.getCurrentQuestionText();
                sendTextMessage(questionText);
            }  else {
                Message pendingMessage = sendTextMessage("ChatGPT генерирует opener, подождите...");
                String prompt = TinderBoltApp.loadPrompt("opener");
                String aboutFriend = companion.toString();
                String chatGptAnswer = chatGptService.sendMessage(prompt, aboutFriend);
                updateTextMessage(pendingMessage, chatGptAnswer);
                currentMode = null;
            }
        }
    }

    private void sendEchoMessage(String messageReceived) {
        sendTextMessage("_Echo:_ " + messageReceived);
    }

    public static void main(String[] args) throws TelegramApiException {
        TinderBoltApp.loadEnvVariables();
        TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
        telegramBotsApi.registerBot(new TinderBoltApp());
    }
}
