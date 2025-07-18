import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'widgets/bui_button.dart';

class BitcoinWalletPage extends StatefulWidget {
  const BitcoinWalletPage({super.key});

  @override
  State<BitcoinWalletPage> createState() => _BitcoinWalletPageState();
}

class _BitcoinWalletPageState extends State<BitcoinWalletPage> {
  bool isDarkMode = false;

  void toggleTheme() {
    setState(() {
      isDarkMode = !isDarkMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF667eea), Color(0xFF764ba2)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1200),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(32),
                child: Stack(
                  children: [
                    // Theme toggle button
                    Positioned(
                      top: 16,
                      right: 16,
                      child: FloatingActionButton(
                        onPressed: toggleTheme,
                        backgroundColor: isDarkMode 
                            ? const Color(0xFF2D2D2D) 
                            : Colors.white,
                        child: Icon(
                          isDarkMode ? Icons.wb_sunny : Icons.nightlight_round,
                          color: isDarkMode ? Colors.white : Colors.black87,
                        ),
                      ),
                    ),
                    // Main content
                    Container(
                      decoration: BoxDecoration(
                        color: isDarkMode 
                            ? const Color(0xFF1A1A1A).withOpacity(0.95)
                            : Colors.white.withOpacity(0.95),
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 40,
                            offset: const Offset(0, 20),
                          ),
                        ],
                      ),
                      padding: const EdgeInsets.all(64),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Bitcoin Wallet',
                            style: GoogleFonts.inter(
                              fontSize: 56,
                              fontWeight: FontWeight.w700,
                              color: isDarkMode ? Colors.white : const Color(0xFF2D2D2D),
                              letterSpacing: -0.02,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'A simple bitcoin wallet',
                            style: GoogleFonts.inter(
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                              color: isDarkMode 
                                  ? Colors.white.withOpacity(0.7) 
                                  : const Color(0xFF5C5C5C),
                              height: 1.6,
                            ),
                          ),
                          const SizedBox(height: 48),
                          BuiButton(
                            label: 'Get Started',
                            styleType: BuiButtonStyleType.filled,
                            size: BuiButtonSize.large,
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Get Started pressed!')),
                              );
                            },
                          ),
                          const SizedBox(height: 16),
                          BuiButton(
                            label: 'Restore Wallet',
                            styleType: BuiButtonStyleType.outline,
                            size: BuiButtonSize.large,
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Restore Wallet pressed!')),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
} 